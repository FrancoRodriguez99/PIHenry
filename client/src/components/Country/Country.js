import React from "react";
import { Link } from "react-router-dom";
import "./Country.css";

function Country(data) {
  return (
    <li className="countrybox">
      <img alt="flag" src={data.data.img} className="imgflag"></img>
      <h3>{data.data.name}</h3>
      <p>{data.data.cont}</p>

      <Link to={`/Details/${data.data.id}`}>Ver Mas</Link>
    </li>
  );
}

export default Country;
