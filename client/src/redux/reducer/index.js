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
  busqueda: [],
  filtrado: [],
  detalles: {},
  loading: true,
  detailsLoading: true,
};

var invert = false;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      var paginaC = action.payload;
      const countr = [];
      //el readme pide que muestre los primeros 9 en la primer pagina y luego muestre de a 10...
      countr.push(paginaC.splice(0, 9));
      while (paginaC.length) {
        countr.push(paginaC.splice(0, 10));
      }
      return { ...state, countries: countr, filtrado: countr, loading: false };
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
      return { ...state };

    case GET_DETAILS:
      return {
        ...state,
        detalles: action.payload,
        detailsLoading: false,
      };

    case FILTER_COUNTRIES:
      var paises = [];
      state.countries.forEach((x) => {
        paises = paises.concat(x);
      });

      var filtrado = [];

      if (action.payload.continente !== "Todos") {
        filtrado = paises.filter((x) => {
          return x.cont === action.payload.continente;
        });
      } else {
        filtrado = [...paises];
      }

      console.log(action.payload);
      if (action.payload.busqueda && action.payload.continente !== "Todos") {
        filtrado = filtrado.filter((x) => {
          return (
            x.name
              .toLowerCase()
              .includes(action.payload.busqueda.toLowerCase()) ||
            x.subreg
              .toLowerCase()
              .includes(action.payload.busqueda.toLowerCase()) ||
            x.cap.toLowerCase().includes(action.payload.busqueda.toLowerCase())
          );
        });
      } else if (action.payload.busqueda) {
        filtrado = paises.filter((x) => {
          return x.name
            .toLowerCase()
            .includes(
              action.payload.busqueda.toLowerCase() ||
                x.subreg
                  .toLowerCase()
                  .includes(action.payload.busqueda.toLowerCase()) ||
                x.cap
                  .toLowerCase()
                  .includes(action.payload.busqueda.toLowerCase())
            );
        });
      }

      if (invert) {
        if (action.payload.orden === "Poblacion") {
          filtrado.sort((a, b) => a.pop - b.pop);
          invert = false;
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
          invert = false;
        }
      } else {
        if (action.payload.orden === "Poblacion") {
          filtrado.sort((a, b) => b.pop - a.pop);
          invert = true;
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
          invert = true;
        }
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
