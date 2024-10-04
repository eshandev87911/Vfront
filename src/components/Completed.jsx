import styles from "./Completed.module.css";
import { Context } from '../contexts/Context';
import { useContext } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function Completed() {
  const {array, setarr} = useContext(Context);
  return (
    <div>
      <h1 className={styles.main}>Completed Task</h1>
      <ul className={styles.List}>
        {array.map((comp, i) => comp.isComp && <List key={i} comp={comp}  />)}
      </ul>
    </div>
  );
}

function List({ comp}) {
  const {array, setarr} = useContext(Context);
  const {currUser} = useAuth();
  function handledel(_id) {
    axios.delete(`${import.meta.env.VITE_API_URL}/todo/${currUser._id}/${_id}`);
    let arr = array.filter((item, index) => {
      if (item._id !== _id) {
        return item;
      }
    });
    //let arr = array;
    console.log(arr);
    setarr(arr);
    //  navigate("/app");
  }
  return (
    <li className={styles.li}>
      <h1>{comp.task}</h1>
      <button
          onClick={() => {
            handledel(comp._id);
          }}
        >
          ❌
        </button>
    </li>
  );
}

export default Completed;
