import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error Page</h1>,
    children: [
      {
        path: "/",
        element: <h1>Home Page</h1>
      },
      {
        path: "/login",
        element: <h1>Login Page</h1>
      },
      {
        path: "/signup",
        element: <h1>Signup Page</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
