import { Link } from "react-router";
import styles from "./NavBar.module.css";

export default function NavBar({ numCartItems }) {
  return (
    <nav className={styles.navBar}>
      <h1 className={styles.title}>Fake Business</h1>
      <ul className={styles.linksList}>
        <li>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/shop">
            Shop
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/cart">
            Cart ({numCartItems})
          </Link>
        </li>
      </ul>
    </nav>
  );
}
