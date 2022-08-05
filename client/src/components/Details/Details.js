import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../redux/actions";
import "./Details.css";
import Cargando from "../Cargando/Cargando";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detalles = useSelector((state) => state.detalles);
  const loading = useSelector((state) => state.detailsLoading);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [id, dispatch]);

  return (
    <div id="detailsbox">
      {loading ? (
        <Cargando />
      ) : (
        <div id="details">
          <img alt="flag" src={detalles.img} id="flagimg"></img>
          <h2>{detalles.name}</h2>
          <h3>{detalles.cont}</h3>
          <div id="datapais">
            <p>Id: {detalles.id}</p>
            <p>Capital: {detalles.cap}</p>
            <p>Sub-Region: {detalles.subreg}</p>
            <p>Area: {detalles.area}km2</p>
            <p>Población: {detalles.pop}</p>
          </div>
          <h3>Actividades del Pais</h3>
          <div id="activitiesbox">
            {detalles.tourisms.map((element) => {
              var duracion = element.dura.split("-");

              return (
                <div key={element.id} className="activities">
                  <h4>{element.name}</h4>
                  <p>
                    {duracion[0]}hs y {duracion[1]}min
                  </p>
                  <p>Dificultad: {element.diff}/5 </p>
                  <p>Temporada de: {element.temp}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div id="backbtnbox">
        <Link to={`/Principal/0`} id="backbtn">
          Volver
        </Link>
      </div>
    </div>
  );
}

export default Details;
