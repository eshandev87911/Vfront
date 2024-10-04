import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";
import PayModal from "../components/PayModal";


function HomePage() {
  return (
    <main className={styles.homepage}>
    <PayModal/>
      <PageNav />
      <section>
        <h1>
          &quot;Forget your to-do list and create a to-be list &quot;
          <br />
        </h1>
        <h2>Welcome to the Voice Recognition Todo List!</h2>
        <Link to="/app" className="cta">
          Start Recording Now
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
