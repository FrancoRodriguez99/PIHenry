import React from "react";
import { Link } from "react-router-dom";

function Country(data) {
  return (
    <li>
      <h3>{data.data.name}</h3>
      <p>{data.data.cont}</p>
      <img alt="flag" src={data.data.img}></img>
      <Link to={`/Details/${data.data.id}`}>Ver Mas</Link>
    </li>
  );
}

export default Country;
