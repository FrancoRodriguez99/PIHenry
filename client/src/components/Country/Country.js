import React from "react";
import { Link } from "react-router-dom";
import "./Country.css";

function Country(data) {
  return (
    <Link to={`/Details/${data.data.id}`} className="more">
      <li className="countrybox">
        <img alt="flag" src={data.data.img} className="imgflag"></img>
        <h3 className="country_h3">{data.data.name}</h3>
        <p className="country_p">{data.data.cont}</p>
      </li>
    </Link>
  );
}

export default Country;
