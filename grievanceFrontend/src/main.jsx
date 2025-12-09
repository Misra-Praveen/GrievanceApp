import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { lazy, Suspense } from 'react';

const Home = lazy(()=>import('./components/Home.jsx'))
const RegisterGrievance = lazy(()=>import("./components/RegisterGrievance.jsx"))

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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
