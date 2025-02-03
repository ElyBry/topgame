import { useCallback, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './utils/router'

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

  return <RouterProvider router={createBrowserRouter(router)} />
}

export default App
