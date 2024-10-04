import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider=({children})=>{
    const [currUser,setCurrUser]= useState({})
    const [array, setarr] = useState([]);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState("");

    return(
        <Context.Provider value={{currUser, array, setarr, show, setShow, alert, setAlert, setCurrUser}}>
            {children}
        </Context.Provider>
    )
}