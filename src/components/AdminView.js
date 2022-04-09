import React from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Gcliente from "../paginas/Gcliente";
import Gproducto from "../paginas/Gproducto";
import Gproveedor from "../paginas/Gproveedor";
import Gstock from "../paginas/Gstock";
import Gventas from "../paginas/Gventas";
import HistorialV from "../paginas/HistorialV";


function AdminView() {
  return <div className="menu">
  <header>
  <nav>
    <ul>
      <li>Añadir
        <ul>
            <li> <a href="/AddCliente">Añadir Cliente</a></li>
            <li> <a href="/AddProducto">Añadir Producto</a> </li>
            <li><a href="/AddProveedor">Añadir Proveedor</a></li>
        </ul>
        </li>
      <li>Gestion
      <ul>
            <li><a href="/">Gestion Venta</a></li>
            <li><a href="/Gstock">Gestion Stock</a></li>
    </ul> 
    </li>
      <li><a href="/historialV">Historial Ventas</a> </li>
    </ul>
    </nav>
   </header>
  <div className="ventanaSecundaria">
  <BrowserRouter>

      <Routes>
      <Route path="/" element={<Gventas />} />
      <Route path="/AddCliente" element={<Gcliente />} />
      <Route path="/AddProducto" element={<Gproducto />} />
      <Route path="/AddProveedor" element={<Gproveedor/>} />
      <Route path="/GestionStock" element={<Gstock />} />
      <Route path="/historialVentas" element={<HistorialV />} />
      </Routes>

  </BrowserRouter>

  </div>
 
  </div>
}

export default AdminView;