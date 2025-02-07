import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './utils/router'
import { UserContextProvider } from './context/userContext'
import { TUserInfoResponse } from './api/auth/userInfoApi'
import { AppLayout } from './layouts/AppLayout'

function App() {
  const [userData, setUserData] = useState<TUserInfoResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // const fetchServerData = useCallback(async () => {
  //   const url = `http://localhost:${__SERVER_PORT__}`
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   console.log(data)
  // }, [])

  // useEffect(() => {
  //   fetchServerData()
  // }, [fetchServerData])

  return (
    <UserContextProvider
      value={{
        userInfo: userData,
        loading: isLoading,
        setUserInfo: setUserData,
        setLoading: setIsLoading,
      }}>
      <AppLayout>
        <RouterProvider router={createBrowserRouter(router)} />
      </AppLayout>
    </UserContextProvider>
  )
}

export default App
