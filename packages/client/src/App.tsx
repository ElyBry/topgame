import { useCallback, useEffect } from 'react'
import './App.css'
import { SigninPage } from './pages'

function App() {
  const fetchServerData = useCallback(async () => {
    const url = `http://localhost:${__SERVER_PORT__}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  }, [])

  useEffect(() => {
    fetchServerData()
  }, [fetchServerData])

  return <SigninPage />
}

export default App
