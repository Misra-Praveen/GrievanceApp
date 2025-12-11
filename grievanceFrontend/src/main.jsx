import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext.jsx'

const Home = lazy(()=>import('./components/Home.jsx'))
const RegisterGrievance = lazy(()=>import("./components/RegisterGrievance.jsx"));
const Login = lazy(()=>import('./components/Login.jsx'))

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (<Suspense>
          <Home />
        </Suspense>)
      },
      {
        path: "/registerGrievance",
        element: (<Suspense>
          <RegisterGrievance />
        </Suspense>)
      },
      {
        path: "/login",
        element: (<Suspense>
          <Login />
        </Suspense>)
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
    
  </StrictMode>,
)
