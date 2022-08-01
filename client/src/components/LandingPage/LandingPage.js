import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div id="boxbotonPrincipal">
      <Link to="/Principal/0" id="botonPrincipal">
        Iniciar
      </Link>
    </div>
  );
}

export default LandingPage;
