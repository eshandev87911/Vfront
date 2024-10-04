// import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ProfileTo from "../components/ProfileTo";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <>
      <div className={styles.app}>
        <div className={styles.sidenav}>
          <Logo />
          <ProfileTo />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default AppLayout;
