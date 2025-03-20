import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { APP_NAME } from './utils/constants'
import { registerSW } from 'virtual:pwa-register';
import { store } from './store/config/store'
import { Provider } from 'react-redux'
import { router as routes } from './utils/router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes)

if (import.meta.env.MODE === 'production') {
  registerSW();
};

document.title = APP_NAME;

function Main() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, Main())

export default Main