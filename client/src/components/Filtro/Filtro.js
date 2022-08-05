import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { filterCountries } from "../../redux/actions";
import "./Filtro.css";

function LandingPage() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const [filtro, setFiltro] = useState({
    continente: "Todos",
    orden: "nada",
    busqueda: false,
    actividad: "Todos",
    invert: false,
  });
  const actividades = useSelector((state) => state.actividades);
  const dones = [];

  const filtrado = useSelector((state) => state.filtrado.length);

  useEffect(() => {
    dispatch(filterCountries(filtro));
  }, [dispatch, filtro]);

  function handleContinente(e) {
    setFiltro({ ...filtro, continente: e.target.value });
  }

  function handleOrden(e) {
    setFiltro({ ...filtro, orden: e, invert: !filtro.invert });
  }

  function handleSearch(e) {
    if (e.target.value === "") {
      setFiltro({ ...filtro, busqueda: false });
    } else {
      setFiltro({ ...filtro, busqueda: e.target.value });
    }
  }

  function handleActividad(e) {
    setFiltro({ ...filtro, actividad: e.target.value });
  }
  return (
    <div id="filtrobox">
      {page > filtrado || filtrado === 1 ? (
        <Redirect to="/Principal/0" />
      ) : null}
      <span className="line"></span>
      <div className="inputfiltro">
        <p>Buscar Pais</p>
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Buscar"
          className="buscar"
        ></input>
      </div>
      <span className="line"></span>
      <div className="inputfiltro">
        <p>Filtrar por Continente</p>
        <select onChange={(e) => handleContinente(e)}>
          <option value="Todos">Todos</option>
          <option value="Americas">America</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Antarctic">Antartida</option>
        </select>
      </div>
      <span className="line"></span>
      <div className="inputfiltro">
        <p>Filtrar por Actividad Turistica</p>
        <select onChange={(e) => handleActividad(e)}>
          <option value="Todos">Todos</option>
          {actividades.length > 0
            ? actividades.map((x) => {
                if (!dones.includes(x.name)) {
                  dones.push(x.name);
                  return (
                    <option value={x.name} key={x.name}>
                      {x.name}
                    </option>
                  );
                } else return null;
              })
            : null}
        </select>
      </div>
      <span className="line"></span>
      <div className="inputfiltro">
        <p>Ordenar Asc/Des por:</p>
        <button onClick={() => handleOrden("Poblacion")}>Población</button>
        <button onClick={() => handleOrden("Nombre")}>Nombre</button>
      </div>
      <span className="line"></span>
    </div>
  );
}

export default LandingPage;
