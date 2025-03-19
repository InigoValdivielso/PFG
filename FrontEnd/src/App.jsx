import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MainLayout from './components/MainLayout';
import PrerequisitesPage from './pages/PrerequisitesPage';
import ScrollToTop from './components/ScrollToTop';
import SecretaryLayout from './components/SecretaryLayout';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentPortalPage from './pages/StudentPortalPage';
import StudentLayout from './components/StudentLayout';
import StudentMicrocredentialPage from './pages/StudentMicrocredentialPage';
import QRPrerequisitesPage from './pages/QRPrerequisitesPage';
import SuccessPage from './pages/SuccessPage';
import QRInicioSesionPage from './pages/QRInicioSesionPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/prerequisites' element={
        <ScrollToTop><PrerequisitesPage /></ScrollToTop>} />
      </Route>
      <Route path='/comparteCredenciales' element={<QRPrerequisitesPage />} />
      <Route path='/success/:id' element={<SuccessPage />} />
      <Route path='/secretary' element={<SecretaryLayout />} />
      <Route path='/studentLogin' element={<StudentLoginPage />} />
      <Route path='/studentLogin/qr' element={<QRInicioSesionPage />} />

      <Route  element={<StudentLayout />}>
        <Route index path='/studentPortal' element={<StudentPortalPage />} />
        <Route path='/microcredentials' element={<StudentMicrocredentialPage />}/>
      </Route>

      
    </>
      
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;