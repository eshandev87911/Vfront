import { useContext, useRef, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
  } from 'mdb-react-ui-kit';
import { Context } from '../contexts/Context';
 import styles from "./ModalAlert.module.css"
import axios from 'axios';

function UpdateModal() {
  const {show, setShow, alert, array, setarr} = useContext(Context);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   let taskRef = useRef();
   
   function handleUpdate() {
    axios.patch(`${import.meta.env.VITE_API_URL}/todo/${alert.id}`, { task: taskRef.current.value});
    let arr = array.map((item, index) => {
      if (item._id == alert.id) {
        item.task = taskRef.current.value;
      }
      return item;
    });
    //let arr = array;
    console.log(arr);
    setarr(arr);
    //  navigate("/app");
  }

  return (
    <>


      <MDBModal open={show} onClose={handleClose} tabIndex='-1' className={styles.modal}>
        <MDBModalDialog style={{fontSize:'20px', color:'GrayText', padding:'20px'}}>
          <MDBModalContent style={{fontSize:'20px', padding:'10px'}}>
            <MDBModalHeader>
              <MDBModalTitle style={{fontSize:'20px'}}>Update Task</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
            <MDBInput label="Task" id="typeText" type="text" ref={taskRef} defaultValue={alert.task} style={{fontSize:'20px', padding:'18px'}}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn style={{fontSize:'15px' , padding:'10px 25px'}}  onClick={()=>{
                handleUpdate();
                handleClose();
              }}>
                Update
              </MDBBtn>
              {/* <MDBBtn>Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default UpdateModal;