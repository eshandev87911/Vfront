import { Link } from "react-router-dom";
import styles from "./ProfileTo.module.css";
function ProfileTo() {
  return (
    <div className={styles.logoutDiv}>
    <Link to="/">
      <img src="../profile.png" alt="Vocalize logo" className={styles.logo} />
    </Link>
    <Link to="/logout" className={styles.logoutBtn}>
      Logout
    </Link>
    </div>
  );
}

export default ProfileTo;
