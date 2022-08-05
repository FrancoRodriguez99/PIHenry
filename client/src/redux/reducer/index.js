import {
  GET_ALL_COUNTRIES,
  REMOVE_COUNTRY,
  SEARCH_COUNTRY,
  CREATE_ACTIVITY,
  GET_DETAILS,
  FILTER_COUNTRIES,
} from "../actions/index";

const initialState = {
  countries: [],
  actividades: [],
  busqueda: [],
  filtrado: [],
  detalles: {},
  creador: {},
  loading: true,
  detailsLoading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      var paginaC = action.payload;
      var actividades = [];
      action.payload.forEach((x) => {
        x.tourisms.forEach((d) => {
          if (d.name) {
            actividades.push({ name: d.name, country: x.name });
          }
        });
      });
      const countr = [];
      //el readme pide que muestre los primeros 9 en la primer pagina y luego muestre de a 10...
      countr.push(paginaC.splice(0, 9));
      while (paginaC.length) {
        countr.push(paginaC.splice(0, 10));
      }
      return {
        ...state,
        countries: countr,
        filtrado: countr,
        loading: false,
        actividades,
      };
    case SEARCH_COUNTRY:
      let estado = state.busqueda;
      let querry = action.payload;
      let nuevaestado = [];
      querry.forEach((nuevaquerry) => {
        let o = true;
        estado.forEach((estadoactual) => {
          if (estadoactual.name === nuevaquerry.name) {
            o = false;
          }
        });
        if (o) {
          nuevaestado.push(nuevaquerry);
        }
      });

      var busqueda = [...state.busqueda];
      busqueda = busqueda.concat(nuevaestado);
      return { ...state, busqueda };

    case REMOVE_COUNTRY:
      var removed = [...state.busqueda];

      removed = removed.filter((x) => {
        return x.id !== action.payload;
      });

      return { ...state, busqueda: removed };

    case CREATE_ACTIVITY:
      return action.payload.diff
        ? { ...state, creador: action.payload }
        : { ...state, creador: action.payload.parent };

    case GET_DETAILS:
      return {
        ...state,
        detalles: action.payload,
        detailsLoading: false,
      };

    case FILTER_COUNTRIES:
      var filtrado = [];
      state.countries.forEach((x) => {
        filtrado = filtrado.concat(x);
      });

      if (action.payload.continente !== "Todos") {
        filtrado = filtrado.filter((x) => {
          return x.cont === action.payload.continente;
        });
      }

      if (action.payload.busqueda) {
        filtrado = filtrado.filter((x) => {
          return (
            x.name
              .toLowerCase()
              .includes(action.payload.busqueda.toLowerCase()) ||
            x.cap.toLowerCase().includes(action.payload.busqueda.toLowerCase())
          );
        });
      }

      if (action.payload.invert) {
        if (action.payload.orden === "Poblacion") {
          filtrado.sort((a, b) => a.pop - b.pop);
        }
        if (action.payload.orden === "Nombre") {
          filtrado.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA > nameB
              ? 1
              : nameB > nameA
              ? -1
              : nameB === nameA
              ? 0
              : null;
          });
        }
      } else {
        if (action.payload.orden === "Poblacion") {
          filtrado.sort((a, b) => b.pop - a.pop);
        }
        if (action.payload.orden === "Nombre") {
          filtrado.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA > nameB
              ? -1
              : nameB > nameA
              ? 1
              : nameB === nameA
              ? 0
              : null;
          });
        }
      }

      if (action.payload.actividad !== "Todos") {
        var paisesconxactividad = [];
        state.actividades.forEach((x) => {
          if (x.name === action.payload.actividad) {
            paisesconxactividad.push(x.country);
          }
        });
        filtrado = filtrado.filter((x) => {
          let o = false;
          paisesconxactividad.forEach((t) => {
            if (t === x.name) {
              o = true;
            }
          });
          return o;
        });
      }

      var a = [];
      a.push(filtrado.splice(0, 9));
      while (filtrado.length) {
        a.push(filtrado.splice(0, 10));
      }

      return { ...state, filtrado: a };

    default:
      return state;
  }
};

export default rootReducer;
