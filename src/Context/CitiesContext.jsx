import { createContext, useEffect, useContext, useReducer } from "react";
const URL = "http://localhost:9000";
const CitiesContext = createContext();
const initialstate = {
  city: [],
  isloading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isloading: true };
    case "cities/loaded":
      return { ...state, isloading: false, city: action.payload };
    case "city/created":
      return {
        ...state,
        isloading: false,
        city: [...state.city, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isloading: false,
        city: state.city.filter((c) => c.id !== action.payload),
      };
    case "city/loaded":
      return { ...state, isloading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { city, isloading, currentCity, error } = state;
  useEffect(function () {
    async function fetchCity() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading cities",
        });
      }
    }
    fetchCity();
  }, []);
  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error loading city",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error creating city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting the city",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        city,
        isloading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Citiescontext used in wrong location");

  return context;
}
export { CitiesProvider, useCities };
