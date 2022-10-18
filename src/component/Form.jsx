import React, { useState } from 'react';
import Lottie from 'react-lottie';
import * as lockDoor from './lock_door.json'; 


import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles/Form.css'
import img1 from '../imgs1.jpg'

 export const Form = () => {
  // validateFirstName(firstName);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();


  //img display
  const options={
    loop:true,
    autoplay:true,
    animationData: lockDoor,
    renderSettings:{
      preserveAspectRation : 'xMidYMid slice'
    }
  }




  // handlers
  const handleSubmit = () => {
    const isOk = checkFirst() & checkLast() & checkEmail() & checkPhone();
    if (isOk) {
      const op = {
        'First Name': firstName,
        'Middle Name': middleName,
        'Last Name': lastName,
        'Email ': email,
        Phone: phone,
      };
      let output=[]
      output=[...firstName+middleName+lastName+email+phone]
      // localStorage.setItem("op1",op);
      // localStorage.setItem(output);
      // localStorage.setItem('userName', firstName + ' ' + lastName);
      navigate('/more');
    }
  };

  const handlefchange = (e) => {
    document.getElementById('first').innerHTML = '';
    setFirstName(e.target.value);
  };

  const handlelchange = (e) => {
    document.getElementById('last').innerHTML = '';
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    document.getElementById('noemail').innerHTML = '';
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    document.getElementById('nophone').innerHTML = '';
    setPhone(e.target.value);
  };

  // is empty checkers
  const checkFirst = () => {
    let flag = 1;
    if (firstName === '') {
      document.getElementById('first').innerHTML = 'Enter first name';
      flag = 0;
    } else {
      document.getElementById('first').innerHTML = '';
    }
    return flag;
  };

  const checkLast = () => {
    let c = checkFirst();
    let flag = 1;
    if (lastName === '') {
      document.getElementById('last').innerHTML = 'Enter last name';
      flag = 0;
    } else {
      document.getElementById('last').innerHTML = '';
    }
    return flag;
  };

  const checkEmail = () => {
    let c = checkFirst() & checkLast();
    let flag = 1;
    if (email === '') {
      document.getElementById('noemail').innerHTML = 'Enter EmailId';
      flag = 0;
    } else {
      var validemail = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/;
      if (validemail.test(email)) {
        document.getElementById('noemail').innerHTML = '';
        return 1;
      } else {
        document.getElementById('noemail').innerHTML = 'Enter valid Email';
        return 0;
      }
    }
    return flag;
  };

  const checkPhone = () => {
    if (phone === '') {
      document.getElementById('nophone').innerHTML = 'Enter Phone Number';
      return 0;
    } else {
      var validphone = /[7-9]\d{9}/;
      if (validphone.test(phone)) {
        document.getElementById('nophone').innerHTML = '';
        return 1;
      } else {
        document.getElementById('nophone').innerHTML =
          'Enter valid Phone number';
        return 0;
      }
    }
  };


  
  return (
    <>
      <div className="form-popup">
        <div className='form-class'>
        <form className="form">
          <br />
          <label htmlFor="name">
          <div data-testid="first">First Name*</div> </label>
          
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            fullWidth
            required
            placeholder="firstName"
            value={firstName}
            onChange={(e) => {
              handlefchange(e);
            }}
          />
          <div id="first" style={{ color: 'red' }}></div>
          <br />
          <label htmlFor="name">
            <div data-testid="middle">
              
              </div>Middle Name</label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder='middleName'
            size="small"
            fullWidth
            value={middleName}
            onFocus={checkFirst}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="name">
          <div data-testid="last">Last Name*</div></label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            fullWidth
            required
            placeholder='lastName'
            onFocus={checkFirst}
            onChange={(e) => {
              handlelchange(e);
            }}
          />
          <div id="last" style={{ color: 'red' }}></div>
          <br />
          <label htmlFor="name">
          <div data-testid="mail">Email*</div></label>
          <TextField
            type="email"
            id="outlined-basic"
            variant="outlined"
            size="small"
            placeholder='email'
            fullWidth
            required
            value={email}
            onFocus={checkLast}
            onChange={(e) => {
              handleEmailChange(e);
            }}
          />
          <div id="noemail" style={{ color: 'red' }}></div>

          <br />
          <label htmlFor="name">
          <div data-testid="mobile">Phone Number*</div></label>

          <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            size="small"
            placeholder='phone'
            fullWidth
            required
            value={phone}
            onFocus={checkEmail}
            onChange={(e) => {
              handlePhoneChange(e);
            }}
          />
          <div id="nophone" style={{ color: 'red' }}></div>
          <br />

          <Button id="submit" variant="contained" onClick={handleSubmit}>
            Save & Continue
          </Button><br/><br/>
          <progress value={50} max={100} id="progressbar">1</progress>
        </form>
      </div>
      
      </div>
      <center>
      {/* <img id="img" src={img1} alt='not found' height="500px" width={"500px"}/> */}
      <Lottie options={options} height={"500px"} width={"500px"}/>
      </center>
    </>
  );
};

export const validateEmail =(email) =>{
  email.includes("@");
}