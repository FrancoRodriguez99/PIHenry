import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div id="navBox">
      <p id="navBarTitle">Paises por Franco</p>
      <div id="navBarLinksbox">
        <Link to="/" className="navBarLinks">
          Home
        </Link>
        <Link to="/Principal/0" className="navBarLinks">
          Paises
        </Link>
        <Link to="/ActivityCreate" className="navBarLinks">
          Formulario crear Actividad
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
