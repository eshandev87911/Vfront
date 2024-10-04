import styles from "./Sidebar.module.css";
// import Footer from "./Footer";
import NewTask from "./NewTask";
import Completed from "./Completed";
import Current from "./Current";

function Slidebar() {
  
  return (
    <div className={styles.sidebar}>
      {/* <Outlet /> */}
      <div className={styles.left}>
        <NewTask />
        <Completed />
      </div>
      <Current />
    </div>
  );
}
{
  /* <Footer />   */
}

export default Slidebar;
