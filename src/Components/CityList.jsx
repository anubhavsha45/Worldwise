import PropTypes from "prop-types";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
function CityList({ city, isloading }) {
  if (isloading) return <Spinner />;
  if (!city.length)
    return <Message message="Add your first city with thehelp of the map" />;
  return (
    <ul className={styles.cityList}>
      {city.map((citi) => (
        <CityItem citi={citi} key={citi.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  city: PropTypes.array.isRequired,
  isloading: PropTypes.bool.isRequired,
};

export default CityList;
