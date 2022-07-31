import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchCountry,
  removeCountry,
  createActivity,
} from "../../redux/actions";

function ActivityCreate() {
  const [estado, setEstado] = useState({
    nombre: [false],
    duracion: [false],
    dificultad: [false],
    temporada: [false],
    busqueda: [false],
  });
  const busqueda = useSelector((state) => state.busqueda);
  const dispatch = useDispatch();

  function handleName(e) {
    let i = e.target.value;
    if (typeof i === "string" && i.length <= 255 && i.length >= 4) {
      setEstado({ ...estado, nombre: [true, i] });
    } else {
      setEstado({ ...estado, nombre: [false] });
    }
  }
  function handleDuracion(e) {
    let i = e.target.value;
    i = i.split("-");
    i[0] = parseInt(i[0]);
    i[1] = parseInt(i[1]);

    if (i.length === 2 && !Number.isNaN(i[0]) && !Number.isNaN(i[1])) {
      i = i.join("-");
      setEstado({ ...estado, duracion: [true, i] });
    } else {
      setEstado({ ...estado, duracion: [false] });
    }
  }

  function handleDificultad(e) {
    if (e.target.value >= 1 && e.target.value <= 5) {
      setEstado({ ...estado, dificultad: [true, e.target.value] });
    } else {
      setEstado({ ...estado, dificultad: [false] });
    }
  }
  function handleTemporada(e) {
    setEstado({ ...estado, temporada: [true, e.target.value] });
  }

  function handlePaises(e) {
    if (e.target.value.length > 3) {
      setEstado({ ...estado, busqueda: [true, e.target.value] });
    } else {
      setEstado({ ...estado, busqueda: [false] });
    }
  }
  function handleAdd() {
    dispatch(searchCountry(estado.busqueda[1]));
  }

  function handleClick(e) {
    dispatch(removeCountry(e.target.value));
  }

  function sumbitFunction() {
    const data =
      estado.nombre[0] &&
      estado.duracion[0] &&
      estado.dificultad[0] &&
      estado.temporada[0] &&
      estado.busqueda[0] &&
      busqueda.length > 0
        ? true
        : false;

    return data ? (
      <button type="submit">Crear</button>
    ) : (
      <button type="submit" disabled>
        Completa todos los Datos Primero
      </button>
    );
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
    <form onSubmit={(e) => crear(e)}>
      <input
        type="text"
        placeholder="Nombre de la Actividad"
        onChange={(e) => handleName(e)}
      ></input>
      {estado.nombre[0]
        ? null
        : "El nombre deberia ser texto, mayor a 4 caracteres y menor a 255"}

      <input
        type="text"
        placeholder="Duracion"
        onChange={(e) => handleDuracion(e)}
      ></input>
      {estado.duracion[0]
        ? null
        : "La Duracion deberia tener el siguinete formato: Horas-Minutos, separando las horas de los minutos con un guion"}
      <select onChange={(e) => handleDificultad(e)} defaultValue="Dificultad">
        <option disabled>Dificultad</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      {estado.dificultad[0] ? null : "Seleciona una opciones entre 1 y 5"}
      <select onChange={(e) => handleTemporada(e)} defaultValue="Temporada">
        <option disabled>Temporada</option>
        <option value="Verano">Verano</option>
        <option value="Otoño">Otoño</option>
        <option value="Invierno">Invierno </option>
        <option value="Primavera">Primavera</option>
      </select>
      {estado.temporada[0] ? null : "Seleciona una Temporada"}
      <input
        type="text"
        placeholder="Buscar Pais"
        onChange={(e) => handlePaises(e)}
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

      {busqueda.length === 0
        ? null
        : busqueda.map((x) => {
            return (
              <button
                key={x.id}
                value={x.id}
                onClick={(e) => handleClick(e)}
                type="button"
              >
                {x.name}
              </button>
            );
          })}

      {sumbitFunction()}
    </form>
  );
}

export default ActivityCreate;
