import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MedicalLayout from './components/pages/medical/MedicalLayout.jsx'
import MedicalHome from "./components/pages/medical/MedicalHome.jsx";
import MedicalPending from "./components/pages/medical/MedicalPending.jsx";
import MedicalApproved from "./components/pages/medical/MedicalApproved.jsx";
import MedicalRejected from "./components/pages/medical/MedicalRejected.jsx";
// import Layout from "./Layout.jsx";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Login/>}/>
//   )
// )
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />

      {/* Medical section uses Layout */}
      <Route path="medical" element={<MedicalLayout />}>
        <Route index element={<MedicalHome />} />
        <Route path="pending" element={<MedicalPending />} />
        <Route path="approved" element={<MedicalApproved />} />
        <Route path="rejected" element={<MedicalRejected />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
