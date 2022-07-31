export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const REMOVE_COUNTRY = "REMOVE_COUNTRY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const CLEAN_LOADING = "CLEAN_LOADING";

export const getAllCountries = () => (dispatch) => {
  return fetch("http://localhost:3010/countries", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: "GET_ALL_COUNTRIES", payload: json });
    })
    .catch((error) => console.log(error));
};

export const searchCountry = (arg) => (dispatch) => {
  return fetch(`http://localhost:3010/countries?name=${arg}`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: "SEARCH_COUNTRY", payload: json });
    })
    .catch((error) => console.log(error));
};

export const removeCountry = (arg) => {
  return { type: "REMOVE_COUNTRY", payload: arg };
};

export const createActivity = (arg) => (dispatch) => {
  console.log(arg);
  return fetch(`http://localhost:3010/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: "CREATE_ACTIVITY", payload: json });
    })
    .catch((error) => console.log(error));
};

export const getDetails = (arg) => (dispatch) => {
  return fetch(`http://localhost:3010/countries/${arg}`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: "GET_DETAILS", payload: json });
    })
    .catch((error) => console.log(error));
};

export const filterCountries = (arg) => {
  return { type: "FILTER_COUNTRIES", payload: arg };
};

export const cleanLoading = () => {
  return { type: "CLEAN_LOADING" };
};
