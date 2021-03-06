import React, { useState } from "react";

import logo_con_fondo from '../assets/img/logo_con_fondo.png'
import Home from './Home';
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login(props) {

  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [usuarioo,setUsuarioo] = useState({});
  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    })
    .catch((error)=>{
      console.log(error.message);

    }); 

    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function submitHandler(e) {
    
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    if (isRegistrando) {
      // registrar
      registrarUsuario(email, password, rol);
    } else {
      console.log("iniciar sesion");
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (<>
   <div className="hero" >
     <div className="div-logo">
        <img className="logo" src={logo_con_fondo} />
     </div>
      
      <h1 className="title" >{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

      <form className="form-login" onSubmit={submitHandler}>
        <label className="from-login-label" >
          Correo electrónico:
          <input type="email" id="email" />
        </label>

        <label>
          Contraseña:
          <input type="password" id="password" minLength="6" />
        </label>

        <label>
          Rol:
          <select id="rol">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </label>

        <input
          type="submit"
          value={isRegistrando ? "Registrar" : "Iniciar sesión"}
        />
      </form>

      <button className="form-login" onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
    </>);
}

export default Login;
