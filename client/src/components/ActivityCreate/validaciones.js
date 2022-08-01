export const handleName = (e, setEstado, estado) => {
  let i = e.target.value;
  if (typeof i === "string" && i.length <= 255 && i.length >= 4) {
    setEstado({ ...estado, nombre: [true, i] });
  } else {
    setEstado({ ...estado, nombre: [false] });
  }
};
export const handleDuracion = (e, setEstado, estado) => {
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
};

export const handleDificultad = (e, setEstado, estado) => {
  if (e.target.value >= 1 && e.target.value <= 5) {
    setEstado({ ...estado, dificultad: [true, e.target.value] });
  } else {
    setEstado({ ...estado, dificultad: [false] });
  }
};
export const handleTemporada = (e, setEstado, estado) => {
  setEstado({ ...estado, temporada: [true, e.target.value] });
};

export const handlePaises = (e, setEstado, estado) => {
  if (e.target.value.length > 3) {
    setEstado({ ...estado, busqueda: [true, e.target.value] });
  } else {
    setEstado({ ...estado, busqueda: [false] });
  }
};

export const sumbitFunction = (estado, busqueda) => {
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
    <button type="button" disabled>
      Completa todos los Datos Primero
    </button>
  );
};
