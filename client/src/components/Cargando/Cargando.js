import "./Cargando.css";
import image from "../../assets/loading.gif";

function Cargando() {
  return (
    <div id="Cargando">
      <img src={image} alt="Cargando" className="imagecargando" />
    </div>
  );
}

export default Cargando;
