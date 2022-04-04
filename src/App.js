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

  return <>{user ? <Home user={user}
  setUser= {setUser}
   /> : <Login
  setUser= {setUser} />}</>;
}

export default App;
