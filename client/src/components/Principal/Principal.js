import React, { useEffect } from "react";
import Country from "../Country/Country";
import Paginado from "../Paginado/Paginado";
import Filtro from "../Filtro/Filtro";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCountries, cleanLoading } from "../../redux/actions";
import "./Principal.css";

function Principal() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const filtrado = useSelector((state) => state.filtrado);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getAllCountries());
    return () => {
      dispatch(cleanLoading());
    };
  }, [dispatch]);

  return (
    <div id="principalbox">
      {loading ? (
        "Cargando..."
      ) : (
        <div>
          <Filtro />
          <ul id="paisesBox">
            {filtrado[page]
              ? filtrado[page].map((x) => {
                  return <Country data={x} key={x.id} />;
                })
              : null}
          </ul>
        </div>
      )}

      <Paginado largo={filtrado.length} page={page} />
    </div>
  );
}

export default Principal;
