import React, { useEffect, useState } from "react";
import Country from "../Country/Country";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  filterCountries,
  getAllCountries,
  cleanLoading,
} from "../../redux/actions";
import { Link } from "react-router-dom";

function Principal() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const filtrado = useSelector((state) => state.filtrado);
  const loading = useSelector((state) => state.loading);
  const [filtro, setFiltro] = useState({
    continente: "Todos",
    orden: "nada",
    busqueda: false,
  });
  const [gotopage, setGoToPage] = useState(`/Principal/${page}`);
  useEffect(() => {
    dispatch(getAllCountries());
    return () => {
      dispatch(cleanLoading());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterCountries(filtro));
  }, [dispatch, filtro]);

  function handleChange(event) {
    if (
      typeof event.target.value === "number" &&
      event.target.value > 0 &&
      event.target.value
    ) {
      setGoToPage(`/Principal/${event.target.value}`);
    }
  }

  const one = function (direction) {
    var i = parseInt(page);
    if (direction === "ant") {
      if (page <= 0) {
        i = filtrado.length - 1;
        return "/Principal/" + i;
      } else {
        i--;
        return "/Principal/" + i;
      }
    } else {
      if (parseInt(page) === filtrado.length - 1) {
        return "/Principal/0";
      } else {
        i++;
        return "/Principal/" + i;
      }
    }
  };

  function handleContinente(e) {
    setFiltro({ ...filtro, continente: e.target.value });
  }

  function handleOrden(e) {
    setFiltro({ ...filtro, orden: e });
  }

  function handleSearch(e) {
    if (e.target.value === "") {
      setFiltro({ ...filtro, busqueda: false });
    } else {
      setFiltro({ ...filtro, busqueda: e.target.value });
    }
  }

  return (
    <div>
      <input type="text" onChange={(e) => handleSearch(e)}></input>
      <div>
        Continente
        <select onChange={(e) => handleContinente(e)}>
          <option value="Todos">Todos</option>
          <option value="Americas">America</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Antarctic">Antartida</option>
        </select>
        Ordenar Ascendentemente/Descendentemente por
        <button onClick={() => handleOrden("Poblacion")}>Poblacion</button>
        <button onClick={() => handleOrden("Nombre")}>Nombre</button>
        actividad turistica filtrar
      </div>

      {loading ? (
        "Cargando..."
      ) : (
        <ul>
          {filtrado[page]
            ? filtrado[page].map((x) => {
                return <Country data={x} key={x.id} />;
              })
            : null}
        </ul>
      )}

      <div>
        <Link to={one("ant")}>Anterior</Link>
        <Link to={gotopage}>ir A:</Link>
        <input onChange={(event) => handleChange(event)}></input>

        <Link to={one("asd")}>Siguiente</Link>
      </div>
    </div>
  );
}

export default Principal;
