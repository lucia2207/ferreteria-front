// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDHVt_ogdvWIT08FEC4FNQ2h0LbOcyDnS4",
  authDomain: "reactfirebaseferreteria-61c2a.firebaseapp.com",
  projectId: "reactfirebaseferreteria-61c2a",
  storageBucket: "reactfirebaseferreteria-61c2a.appspot.com",
  messagingSenderId: "287746911226",
  appId: "1:287746911226:web:41356abaacdedf1c55d243"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
