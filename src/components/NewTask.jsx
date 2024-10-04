import { useContext, useRef, useState } from "react";
import styles from "./NewTask.module.css";
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../contexts/Context';
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function NewTask() {
  let [inp, setInp] = useState('');
  let dateRef = useRef();
  const {array, setarr} = useContext(Context);
  const {currUser} = useAuth();
  let dd= new Date().toISOString().slice(0,16); 
  
  async function add(item) {
    if(inp){
      let dateTime=dateRef.current.value;
      dateTime=new Date(dateTime);
      const h = { task: item, isComp: false, owner: currUser.email, dueDate: dateTime};
      let res = await axios.post(`${import.meta.env.VITE_API_URL}/todo/${currUser._id}/addtodo`, h)
      console.log(res.data);
      setarr((item) => [...item, res.data.data]);
      setInp("");
    }
  }
  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">New Task</label>
        <input id="cityName" placeholder="Create a new Task" onChange={(e)=>{setInp(e.target.value)}} value={inp} />
        <input id="Time" placeholder="Time" name="date-time" type="datetime-local" min={dd}  ref={dateRef}  />
        <button  className={styles.btn} onClick={()=>{add(inp)}}>ADD </button>
      </div>
    </div>
  );
}





export default NewTask;
