import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../redux/actions";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detalles = useSelector((state) => state.detalles);
  const loading = useSelector((state) => state.detailsLoading);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [id, dispatch]);

  return (
    <div>
      {loading ? (
        "Cargando..."
      ) : (
        <div>
          <img alt="flag" src={detalles.img}></img>
          <h2>{detalles.name}</h2>
          <h3>{detalles.cont}</h3>
          <p>{detalles.id}</p>
          <p>{detalles.cap}</p>
          <p>{detalles.subreg}</p>
          <p>{detalles.area}km2</p>
          <p>{detalles.pop}</p>
          {detalles.tourisms.map((element) => {
            return (
              <div key={element.id}>
                <h4>{element.name}</h4>
                <p>{element.dura}</p>
                <p>{element.diff}</p>
                <p>{element.temp}</p>
              </div>
            );
          })}
        </div>
      )}
      <Link to={`/Principal/0`}>Atras</Link>
    </div>
  );
}

export default Details;
