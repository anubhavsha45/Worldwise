import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Products from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./Components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
const URL = "http://localhost:9000";
function App() {
  const [city, setcity] = useState([]);
  const [isloading, setisloading] = useState(false);
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="Products" element={<Products />} />
        <Route path="Pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList city={city} isloading={isloading} />}
          />
          <Route
            path="cities"
            element={<CityList city={city} isloading={isloading} />}
          />
          <Route
            path="countries"
            element={<CountryList city={city} isloading={isloading} />}
          />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
