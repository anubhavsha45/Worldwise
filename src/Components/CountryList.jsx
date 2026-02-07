import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Context/CitiesContext";
function CountryList() {
  const { city, isloading } = useCities();
  console.log(city);
  if (isloading) return <Spinner />;
  if (!city.length)
    return <Message message="Add your first city with the help of the map" />;
  const countries = city.reduce((acc, cur) => {
    if (!acc.some((el) => el.country === cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, id) => (
        <CountryItem country={country} key={id} />
      ))}
    </ul>
  );
}

export default CountryList;
