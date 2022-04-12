import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
const URL_BASE = "http://ferreterialuciaa.herokuapp.com"

const actIniciarSesion = (auth, email , password) =>  async (dispatch ) => {
    
    // login
      signInWithEmailAndPassword(auth, email, password)  
      .then((userCredential) => {
       // Signed in
       const user = userCredential.user;
       let email = user.email;
 
       let usuario ={
         email: user.email,
         usuario: email.split("@")[0],
         rol:"admin"
       }
       dispatch ({
           type : "iniciarsesion" ,
           payload : usuario
       });
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
     });
}

const actregistrarse = (auth, email, password) => async ( dispatch ) =>{
    const user = await createUserWithEmailAndPassword (auth, email, password) ;

    dispatch({
        type: "registra",
        payload: "Te has registrado correctamente, ahora puedes iniciar sesion"
    });

}

export function cargarUsuario(usuario) {
  return (dispatch) => {
    dispatch({ type: "CARGAR_USUARIO", payload: usuario });
  };
}
