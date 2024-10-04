import { Link, redirect, useNavigate } from "react-router-dom";
import styles from "./Current.module.css";
import { useContext, useState } from "react";
import "regenerator-runtime/runtime";
import { v4 as uuidv4 } from "uuid";
// import { Redirect } from "react-router-dom";
import { Context } from "../contexts/Context";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import UpdateModal from "./UpdateModal";

function Current() {
  // const [g, setg] = useState(arr);
  const { array, setarr, setAlert, setShow } = useContext(Context);
  const { currUser } = useAuth();

  async function add(item) {
    let regex = /[.]/g;
    item = item.replace(regex, "");
    const h = { task: item, isComp: false, owner: currUser.email };
    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/todo/${currUser._id}/addtodo`,
      h
    );
    console.log(res.data);
    setarr((item) => [...item, res.data.data]);
  }

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

  function remove(item) {
    console.log(item);
    let regex = /[.]/g;
    item = item.replace(regex, "");
    console.log(item);
    let st = item.toUpperCase();
    let uid = array.filter((k) => {
      let del;
      let str = k.task.toUpperCase();
      if (st == str) {
        del = k._id;
      }
      return del;
    });
    console.log(uid[0]._id);
    handledel(uid[0]._id);
  }

  function update(item) {
    let regex = /[.]/g;
    item = item.replace(regex, "");
    console.log(item);
    let hh = item.split("as");
    let st = hh[0].toUpperCase().trim();

    let uid = array.filter((k) => {
      let del;
      let str = k.task.toUpperCase().trim();
      console.log(`*${str}*  !${st}!`);
      if (st === str) {
        del = k._id;
      }
      return del;
    });
    axios.patch(`${import.meta.env.VITE_API_URL}/todo/${uid[0]._id}`, {
      task: hh[1],
    });
    console.log(uid);
    let arr = array.map((item, index) => {
      if (item._id == uid[0]._id) {
        item.task = hh[1];
        return item;
      } else {
        return item;
      }
    });
    //let arr = array;
    console.log(arr);
    setarr(arr);
  }
  const navigate = useNavigate();

  const commands = [
    {
      command: ["add *"],
      callback: (item) => add(item),
    },
    {
      command: ["go to *", "open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: ["Update *"],
      callback: (add) => update(add),
    },
    {
      command: ["skip *", "remove *", "delete *"],
      callback: (item) => remove(item),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");

  const pages = ["home", "login"];
  const urls = {
    home: "/",
    login: "/login",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition) {
    return null;
  }

  let redirect = "";
  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = navigate({ redirectUrl });
    } else {
      redirect = <p> could not find page :{redirectUrl}</p>;
    }
  }

  return (
    <div className={styles.main}>
      <UpdateModal />
      <button onClick={SpeechRecognition.startListening} className={styles.btn}>
        {/* <Link className={styles.Link} to="/speech"> */}
        Start Recording
        {/* </Link> */}
      </button>
      <input
        className={styles.inp}
        type="text"
        onChange={() => {}}
        value={transcript}
      />
      <h1 className={styles.head}>Current Task</h1>
      <ul className={styles.List}>
        {array.map((comp, i) => !comp.isComp && <List key={i} comp={comp} />)}
      </ul>
    </div>
  );
}

function List({ comp }) {
  let navigate = useNavigate();
  const { array, setarr, setAlert, setShow } = useContext(Context);
  const { currUser } = useAuth();

  function handleComp(_id) {
    axios.patch(`${import.meta.env.VITE_API_URL}/todo/${_id}`, {
      isComp: true,
    });
    let arr = array.map((item, index) => {
      if (item._id == _id) {
        item.isComp = true;
      }
      return item;
    });
    //let arr = array;
    console.log(arr);
    setarr(arr);
    //  navigate("/app");
  }

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
      <h1> ⚫ {comp.task}</h1>
      <div>
        <button
          onClick={() => {
            handleComp(comp._id);
          }}
        >
          ✅
        </button>
        <button
          onClick={() => {
            setAlert({ id: comp._id, task: comp.task });
            setShow(true);
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/vocalise-f04b7.appspot.com/o/edit.png?alt=media&token=7693a09c-cbea-49fb-aa6f-48bd98151e69"
            alt=""
            srcset=""
            style={{ height: "25px", width: "25px" }}
          />
        </button>
        <button
          onClick={() => {
            handledel(comp._id);
          }}
        >
          ❌
        </button>
      </div>
    </li>
  );
}

export default Current;
