import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchCountry,
  removeCountry,
  createActivity,
} from "../../redux/actions";
import "./ActivityCreate.css";
import {
  handleName,
  handleDuracion,
  handleDificultad,
  handleTemporada,
  handlePaises,
  sumbitFunction,
} from "./validaciones";

function ActivityCreate() {
  const [estado, setEstado] = useState({
    nombre: [false],
    duracion: [false],
    dificultad: [false],
    temporada: [false],
    busqueda: [false],
  });

  const busqueda = useSelector((state) => state.busqueda);
  const creado = useSelector((state) => state.creador);
  const dispatch = useDispatch();

  useEffect(() => {
    if (creado.diff) {
      busqueda.forEach((x) => {
        dispatch(removeCountry(x.id));
      });
      setEstado({
        nombre: [false],
        duracion: [false],
        dificultad: [false],
        temporada: [false],
        busqueda: [false],
      });
      var input = document.getElementsByClassName("input");
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
    }
  }, [creado, busqueda, dispatch]);

  function handleAdd() {
    console.log(estado.busqueda);
    dispatch(searchCountry(estado.busqueda[1]));
  }

  function handleClick(e) {
    dispatch(removeCountry(e.target.value));
  }

  function crear(e) {
    e.preventDefault();
    var paisId = [];
    busqueda.forEach((x) => {
      paisId.push(x.id);
    });
    paisId = paisId.join(",");
    const input = {
      name: estado.nombre[1],
      dura: estado.duracion[1],
      diff: estado.dificultad[1],
      temp: estado.temporada[1],
      paisId,
    };

    dispatch(createActivity(input));
  }

  return (
    <div id="formulariobox">
      <form onSubmit={(e) => crear(e)} id="formulario">
        <h3>Formulario Para Crear Actividad</h3>
        <label htmlFor="name">Nombre de la Actividad:</label>
        <input
          id="name"
          className="input"
          type="text"
          placeholder="Nombre de la Actividad"
          onChange={(e) => handleName(e, setEstado, estado)}
        ></input>
        {estado.nombre[0] ? null : (
          <p className="errortext">
            El nombre deberia ser texto, mayor a 4 caracteres y menor a 255
          </p>
        )}
        <label htmlFor="duracion">Duracion:</label>
        <input
          id="duracion"
          className="input"
          type="text"
          placeholder="Duracion"
          onChange={(e) => handleDuracion(e, setEstado, estado)}
        ></input>
        {estado.duracion[0] ? null : (
          <p className="errortext">
            La Duracion deberia tener el siguinete formato: Horas-Minutos,
            separando las horas de los minutos con un guion
          </p>
        )}
        <label htmlFor="dificultad">Dificultad:</label>
        <select
          onChange={(e) => handleDificultad(e, setEstado, estado)}
          defaultValue="Dificultad"
          className="input"
          id="dificultad"
        >
          <option disabled>Dificultad</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {estado.dificultad[0] ? null : (
          <p className="errortext">Seleciona una opciones entre 1 y 5</p>
        )}
        <label htmlFor="temporada">Temporada:</label>
        <select
          id="temporada"
          onChange={(e) => handleTemporada(e, setEstado, estado)}
          defaultValue="Temporada"
          className="input"
        >
          <option disabled>Temporada</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno </option>
          <option value="Primavera">Primavera</option>
        </select>
        {estado.temporada[0] ? null : (
          <p className="errortext">Seleciona una Temporada</p>
        )}
        <label htmlFor="buscarpais">Buscar Pais</label>
        <input
          id="buscarpais"
          className="input"
          type="text"
          placeholder="Buscar Pais"
          onChange={(e) => handlePaises(e, setEstado, estado)}
        ></input>

        {estado.busqueda[0] ? (
          <button onClick={() => handleAdd()} type="button">
            Agregar Este Pais a la Actividad
          </button>
        ) : (
          <button disabled>
            Agregar este pais a la Actividad, (Error: Minimo 4 letras)
          </button>
        )}
        <div id="countrys_selected_box">
          {busqueda.length === 0
            ? null
            : busqueda.map((x) => {
                return (
                  <div className="country_selected" key={x.id}>
                    <button
                      className="x"
                      value={x.id}
                      onClick={(e) => handleClick(e)}
                    >
                      X
                    </button>
                    <div>{x.name}</div>
                  </div>
                );
              })}
        </div>

        {sumbitFunction(estado, busqueda)}

        {creado.diff ? (
          <div>Actividad {creado.name} creada con exito</div>
        ) : creado.name ? (
          <p>Error: {creado.detail} Corrige el formulario e intenta denuevo</p>
        ) : null}
      </form>
    </div>
  );
}

export default ActivityCreate;
