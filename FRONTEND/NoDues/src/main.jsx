import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// Medical imports
import MedicalLayout from './components/pages/medical/MedicalLayout.jsx'
import MedicalHome from "./components/pages/medical/MedicalHome.jsx";
import MedicalPending from "./components/pages/medical/MedicalPending.jsx";
import MedicalApproved from "./components/pages/medical/MedicalApproved.jsx";
import MedicalRejected from "./components/pages/medical/MedicalRejected.jsx";
//sports imports
import SportsLayout from "./components/pages/sports/SportsLayout.jsx";
import SportsHome from "./components/pages/sports/SportsHome.jsx";
import SportsPending from "./components/pages/sports/SportsPending.jsx";
import SportsApproved from "./components/pages/sports/SportsApproved.jsx";
import SportsRejected from "./components/pages/sports/SportsRejected.jsx";
//store imports
import StoreLayout from "./components/pages/store/StoreLayout.jsx";
import StoreHome from "./components/pages/store/StoreHome.jsx";
import StorePending from "./components/pages/store/StorePending.jsx";
import StoreApproved from "./components/pages/store/StoreApproved.jsx";
import StoreRejected from "./components/pages/store/StoreRejected.jsx";
//administration imports
import AdministrationLayout from "./components/pages/administration/AdministrationLayout.jsx";
import AdministrationHome from "./components/pages/administration/AdministrationHome.jsx";
import AdministrationPending from "./components/pages/administration/AdministrationPending.jsx";
import AdministrationApproved from "./components/pages/administration/AdministrationApproved.jsx";
import AdministrationRejected from "./components/pages/administration/AdministrationRejected.jsx";


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

      <Route path="sports" element={<SportsLayout />}>
        <Route index element={<SportsHome />} />
        <Route path="pending" element={<SportsPending />} />
        <Route path="approved" element={<SportsApproved />} />
        <Route path="rejected" element={<SportsRejected />} />
      </Route>

      <Route path="store" element={<StoreLayout />}>
        <Route index element={<StoreHome />} />
        <Route path="pending" element={<StorePending />} />
        <Route path="approved" element={<StoreApproved />} />
        <Route path="rejected" element={<StoreRejected />} />
      </Route>

      <Route path="administration" element={<AdministrationLayout />}>
        <Route index element={<AdministrationHome />} />
        <Route path="pending" element={<AdministrationPending />} />
        <Route path="approved" element={<AdministrationApproved />} />
        <Route path="rejected" element={<AdministrationRejected />} />
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
