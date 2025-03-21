import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './utils/router'
import { AppLayout } from './layouts/AppLayout'
import { Provider } from 'react-redux'
import { store } from './store/config/store'

function App() {
  // const fetchServerData = useCallback(async () => {
  //   const url = `http://localhost:${__SERVER_PORT__}`
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   console.log(data)
  // }, [])

  // useEffect(() => {
  //   fetchServerData()
  // }, [fetchServerData])

  let routerItem
  if (typeof window !== 'undefined') {
    routerItem = createBrowserRouter(router)
  }

  return router ? (
    <Provider store={store}>
      <AppLayout>
        <RouterProvider router={routerItem} />
      </AppLayout>
    </Provider>
  ) : null
}

export default App
