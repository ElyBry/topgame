import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { APP_NAME } from './utils/constants'
import startServiceWorker from './serviceWorker'

document.title = APP_NAME;

startServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode> */}
)
