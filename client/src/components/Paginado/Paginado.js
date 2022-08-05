import { useState } from "react";
import { Link } from "react-router-dom";
import "./Paginado.css";

function Paginado(data) {
  const [gotopage, setGoToPage] = useState(`/Principal/${data.page}`);

  function handleChange(event) {
    if (
      typeof parseInt(event.target.value) === "number" &&
      event.target.value >= 0 &&
      event.target.value <= data.largo - 1
    ) {
      setGoToPage(`/Principal/${event.target.value}`);
    } else {
      setGoToPage(`/Principal/${data.page}`);
    }
  }

  const one = function (direction) {
    var i = parseInt(data.page);
    if (direction === "ant") {
      if (data.page <= 0) {
        i = data.largo - 1;

        return "/Principal/" + i;
      } else {
        i--;
        return "/Principal/" + i;
      }
    } else {
      if (parseInt(data.page) === data.largo - 1) {
        return "/Principal/0";
      } else {
        i++;
        return "/Principal/" + i;
      }
    }
  };

  return (
    <div id="paginadobox">
      <Link to={one("ant")} className="nextsprev">
        Anterior
      </Link>
      <div className="phonemode">
        <Link to={gotopage} className="nextsprev">
          ir A:
        </Link>
        <input
          onChange={(event) => handleChange(event)}
          placeholder={`Ultima Pagina es ${data.largo - 1}`}
          className="inputpaginado"
        ></input>
      </div>

      <Link to={one("asd")} className="nextsprev">
        Siguiente
      </Link>
    </div>
  );
}

export default Paginado;
