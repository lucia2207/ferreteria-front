import React, { useState } from "react";
import Home from "./containers/Home";
import Login from "./containers/Login";
import './assets/styles/global.css'
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  function setUserWithFirebaseAndRol(usuarioFirebase) {

      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: "admin",
      };
      setUser(userData);
      console.log("userData final", userData);

  }

  onAuthStateChanged(auth, (usuarioFirebase) => { 
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        console.log("por aca pasa") ;
        console.log(usuarioFirebase);
        setUserWithFirebaseAndRol(usuarioFirebase);
        console.log(user) ;
      }
    } else {
      setUser(null);
    }
    console.log(user) ;
  });
  
  return (<> {user==null ? <Login setUser= {setUser} /> : <Home user = {user} setUser= {setUser} />} </> )
}

export default App;