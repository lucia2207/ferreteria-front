import React from "react";

import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

import logo_con_fondo from '../assets/img/logo_con_fondo.png'

import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";


const auth = getAuth(firebaseApp);

function Home({ user, setUser}) {

  const cerrarSesion = ()=>{
    let l = signOut(auth)
    .then(() => {
      setUser(null);
    })
  }

  return (
    <div>
      <usuario>
        {user.usuario}
      </usuario>
      <div className="div-logo">
        <img className="logo" src={logo_con_fondo} />
     </div>
     <div className="div-home" >
          <button class="btnCerrarSesion" onClick={cerrarSesion }> Cerrar sesión</button>
     </div>
     <div className="title-saludo" >
      {user.rol === "admin" ? <AdminView /> : <UserView />}
     </div>
    </div>
  );
}
export default Home;
