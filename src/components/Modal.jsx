import { useContext, useState } from 'react';
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
  } from 'mdb-react-ui-kit';
import { Context } from '../contexts/Context';
 import styles from "./ModalAlert.module.css"

function ModalAlert() {
  const {show, setShow, alert} = useContext(Context);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  return (
    <>


      <MDBModal open={show} onClose={handleClose} tabIndex='-1' className={styles.modal}>
        <MDBModalDialog style={{fontSize:'20px', color:'GrayText', padding:'20px'}}>
          <MDBModalContent style={{fontSize:'20px', padding:'10px'}}>
            <MDBModalHeader>
              <MDBModalTitle style={{fontSize:'20px'}}>Vocalize Say's</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>{alert}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn style={{fontSize:'15px' , padding:'10px 25px'}}  onClick={handleClose}>
                ok
              </MDBBtn>
              {/* <MDBBtn>Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default ModalAlert;