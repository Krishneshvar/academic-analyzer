import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import App from './App.jsx'
import Navbar from './components/Navbar/Navbar.jsx';
import DecisionTree from './components/CodeEditor/DecisionTree.jsx';
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <App />, },
  { path: "/decision-tree", element: <DecisionTree />, },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Outlet />
  </StrictMode>,
)
