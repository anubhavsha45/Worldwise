import { createContext, useState, useEffect, useContext } from "react";
const URL = "http://localhost:9000";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [city, setcity] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [currentCity, setcurrentCity] = useState({});
  useEffect(function () {
    async function fetchCity() {
      try {
        setisloading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setcity(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setisloading(false);
      }
    }
    fetchCity();
  }, []);
  async function getCity(id) {
    try {
      setisloading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setcurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setisloading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        city,
        isloading,
        currentCity,
        getCity,
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
