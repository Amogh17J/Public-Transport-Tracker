import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Remove index.css if it's empty to keep it clean
import './App.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)