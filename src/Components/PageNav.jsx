import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <Link to="/Pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/Products">Products</Link>
        </li>
        <li>
          <Link to="/login" className={styles.ctaLink}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
