import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from './App.jsx'
import Navbar from './components/Navbar/Navbar.jsx';
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <App />, },
  // { path "/mth", element: <smth/>, },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>,
)
