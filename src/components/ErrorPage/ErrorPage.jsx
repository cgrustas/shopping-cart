import styles from "./ErrorPage.module.css";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h2 className={styles.errorMessage}>Error: this route doesn't exist!</h2>
      <Link className={styles.link} to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
