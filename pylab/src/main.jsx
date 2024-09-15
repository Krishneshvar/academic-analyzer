import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import App from './App.jsx'
import Navbar from './components/Navbar/Navbar.jsx';
import DecisionTree from './components/CodeEditor/Codes/DecisionTree.jsx';
import RandomForest from './components/CodeEditor/Codes/RandomForest.jsx';
import SupportVector from './components/CodeEditor/Codes/SupportVector.jsx';
import Comparison from './components/CodeEditor/Codes/Comparison.jsx';
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <App />, },
  { path: "/decision-tree", element: <DecisionTree />, },
  { path: "/random-forest", element: <RandomForest />, },
  { path: "/support-vector", element: <SupportVector />, },
  { path: "/comparison", element: <Comparison />, },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Outlet />
  </StrictMode>,
)
