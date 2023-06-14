import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, HashRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Mercado from './components/mercado/Mercado';
import Carrito from './components/mercado/Carrito';
import Register from './components/mercado/Registrer';
import { isAutenticated, hasRole } from './auth/auth.authenticated';
import { Protected } from './interceptor/Protected';
import Authorized from './components/Auth';
import Logout from './components/Logout';


function App() {
  const [user, setUser] = useState("");
  const [sesion, setSesion] = useState(false);
  const [roles, setRoles] = useState([]);
  //const history = useNavigate();
  let _token;
  //56:

  useEffect(
    () => {
      setSesion(isAutenticated());
      //  getRoles();
    }, []
  );


  return (

    <BrowserRouter>
      {//console.log(" ad " + sesion)
      }
      {//console.log(roles.includes('ROLE_ADMIN', 'ROLE_USER'))
      }

      <Routes>
      <Route path='/authorized' element={
            <Authorized />
          }
          />
          <Route path='/logout' element={
            <Logout />
          }
          />
        <Route path='/' element={
          <Protected sesion={sesion} redirectTo="/">
            <Login />
          </Protected>
        } />
        <Route path='/mercadolibre' element={
          <Protected redirectTo="/mercadolibre">
            <Mercado />
          </Protected>
        } />

        <Route path='/mercadolibre/page/:page' element={
          <Protected redirectTo="/mercadolibre">
            <Mercado />
          </Protected>
        } />
        <Route path='/carrito/:id' element={
          <Protected sesion={sesion} user={['ROLE_CLIENT']} redirectTo="/mercadolibre">
            <Carrito />
          </Protected>
        } />
        <Route path='/register' element={
          <Protected redirectTo="/register">
            <Register />
          </Protected>
        } />

      </Routes>
    </BrowserRouter>

  );
}



export default App;
