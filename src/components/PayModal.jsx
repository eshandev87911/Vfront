import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useContext, useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import styles from './Modal.module.css'
import { Context } from '../contexts/Context';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function PayModal(e) {
    const {show, setShow} = useContext(Context);
    const toggleOpen = () => setShow(!show);
    const { currUser, setUser } = useAuth();

    const amount=99900;
    const currency= "INR";
    const receiptId="voca"+Math.floor(Math.random()*1000);


    async function paymentHandler() {
        try {
            let order = await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
            amount,
            currency,
            receipt: receiptId,
            });

            console.log(order);

            var options = {
            "key": "rzp_test_8f5zadujUXjFc7", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "Vocalize", //your business name
            "description": "Vocalize Subscription",
            "image": "https://firebasestorage.googleapis.com/v0/b/vocalise-f04b7.appspot.com/o/logo.jpg?alt=media&token=0ad2c343-d267-4336-9533-cd3911125b32",
            "order_id": order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
                let validateRes = await axios.post(`${import.meta.env.VITE_API_URL}/order/validate`, response);
                if(validateRes.data.msg==="success"){
                    let upUser= await axios.patch(`${import.meta.env.VITE_API_URL}/user/update/${currUser._id}`);
                    setUser(upUser.data);
                    console.log(upUser);
                } 
                console.log(validateRes);
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": currUser.name, //your customer's name
                "email": currUser.email,  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#00c46a"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.description);
        });
        rzp1.open();
        return false;
        } catch (err) {
            console.log(err);
        }
    
    }

  return (
    <div style={{width:'100vw'}}>

      <MDBModal animationDirection='top' open={show} tabIndex='-1' onClose={() => setShow(false)} className={styles.modal} >
        <MDBModalDialog position='top' frame="true" style={{fontSize:'20px', color:'GrayText'}}>
          <MDBModalContent >
            <MDBModalBody className='py-1' style={{height:'80px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div className=' my-3' style={{display:'flex', justifyContent:'space-around', alignItems:'center', width:'85%'}}>
                <p className='mb-0'>View all your Favourite Personality's TODOs just at &#x20b9;999 only</p>
                <div>
                <MDBBtn color='success' size='lg' className='ms-3' onClick={(e)=>{
                    paymentHandler(e);
                    toggleOpen();
                    }}  style={{fontSize:'12px', borderRadius:'5px', fontWeight:'bolder', padding:'8px 14px'}}>
                  Subscribe
                </MDBBtn>
                <MDBBtn size='lg' color='info' className='ms-5' onClick={toggleOpen} style={{fontSize:'12px', borderRadius:'5px', fontWeight:'bolder',  padding:'8px 14px'}}>
                  No, Thanks
                </MDBBtn>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}