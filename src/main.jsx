import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { Loginpage, Signuppage, RouteController, Errorpage } from './pages'
import { AuthLayout } from './components'

import store from './store/store.js'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <RouteController />
      },
      {
        path: "/login",
        element: (
          <AuthLayout>
            <Loginpage />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout>
            <Signuppage />
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
