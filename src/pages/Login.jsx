import { useContext, useRef, useState } from "react";
// import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../contexts/Context'; 
import ModalAlert from '../components/Modal';
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES

  let navigate = useNavigate();
  let emailInputRef= useRef();
  let passInputRef = useRef();

  const {setShow, setAlert, setarr} = useContext(Context);
  const {setToken, setUser, currUser} = useAuth();




  async function handleLogin(e) {
    e.preventDefault();
    let email = emailInputRef.current.value;
    let pass = passInputRef.current.value;
    if(!(email && pass)){
        setAlert("Please Enter Full Details!!!")
        setShow(true);
        return;
    }

    try {
      let res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email:email, 
        password:pass,
      });
      console.log(res);
       setUser(res.data.data.userdata);
      setToken(res.data.data.token);

      await axios
      .get(`${import.meta.env.VITE_API_URL}/todo/${res.data.data.userdata._id}/todos`)
      .then((res) => {
        setarr(res.data)
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      })
   
      navigate("/app");
      
    } catch (e) {
      console.log(e);
      setAlert(e.response.data)
      setShow(true);
      //alert(e.response.data)
    }
  }

  return (
    <main className={styles.login}>
    
      <Logo />
      <ModalAlert/>
      <form className={styles.form}>
      <h1>Sign In</h1>
        <div className={styles.row}>
          <label htmlFor="email" name="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailInputRef}
            placeholder="jack@example.com"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passInputRef}
            placeholder="Password"
          />
        </div>

        <div style={{display:'flex', justifyContent:'center'}}>
          Not Registered? &nbsp; <Link to={'/register'} style={{color:'cyan'}}> Sign Up</Link>
        </div>

        <div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <button style={{padding:' 7px 5rem', borderRadius:'8px'}} onClick={handleLogin}>Login</button>
          </div>
        </div>
      </form>
    </main>
  );
}
