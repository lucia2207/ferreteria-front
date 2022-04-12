import firebaseApp from "../firebase/credenciales";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

function Home({user, setUser}) {

  return (
    <div>
      <div>
      </div>
      <div className="div-logo">
      {/* <img className="logo" src={logo_con_fondo} /> */}
     </div>
    <div className="div-home" > 
    <button onClick={() => signOut(auth)}> Cerrar sesión</button>
    </div>
        
     <div className="title-saludo" >
      {user?.rol === "admin" ? <AdminView /> : <UserView />}
     </div>
    </div>
  );
}
export default Home;
