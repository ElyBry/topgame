import React from 'react'
import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import { reducer, store } from './store/config/store'
import { fetchUser } from './store/slice/userSlice'
import { router as routes } from './utils/router'
import { Request as ExpressRequest } from 'express'
import { createContext, createFetchRequest, createUrl } from './entry-server.utils'
import { Provider } from 'react-redux'
import { matchRoutes, createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { setPageHasBeenInitializedOnServer } from './store/slice/ssrSlice'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const store = configureStore({
    reducer,
  });

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [{route: { fetchData }}] = foundRoutes

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context);
  const sheet = new ServerStyleSheet();

  try {
    const html = ReactDOM.renderToString(sheet.collectStyles(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ));
    const styleTags = sheet.getStyleTags();

    const helmet = Helmet.renderStatic();

    return {
      html,
      helmet,
      styleTags,
      initialState: store.getState(),
    }
  } finally {
    sheet.seal()
  }
}