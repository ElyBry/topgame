import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { APP_NAME } from './utils/constants'
import startServiceWorker from './serviceWorker'


startServiceWorker();
document.title = APP_NAME;

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode> */}
)