import React, { useState,useEffect } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export const UserDetails = () => {
  const [dob, setDob] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const[country,setCountry]=useState([]);
  const[selectedCountry,setSelectedCountry]=useState('');
  const[states,setState]=useState([]);
  const[selectedState,setSelectedState]=useState('');
  const[city,setCity]=useState([]);
  const[selectedCity,setSelectedCity]=useState('');


  const handleSubmit = () => {
    const isOk =
      checkDob() &
      checkStreet() &
      checkCity() &
      checkZip() &
      checkState() &
      checkCountry();
    if (isOk) {
      let op = {
        'Dob ': dob,
        'Country':selectedCountry,
        'State':selectedState,
        'City':selectedCity,
        "ZipCode":zip,
        'street ': street,
      };
      console.log(op);
      localStorage.setItem("op2",op)
      navigate('/home');
    }
  };


  useEffect(() => {
    const response=axios
      .get(
        'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
         )
      .then((res) => setData(res.data))
      .catch((err) => console.log("warnings"));
  }, []);
  const allCountries=[...new Set(data.map(it => it.country ))];
  allCountries.sort()


  const countryChange=(e) =>{
    setSelectedCountry(e.target.value)
    let allStates=data.filter(state => state.country===e.target.value);
    allStates=[...new Set(allStates.map(state=> state.subcountry))];
    allStates.sort()
    setState(allStates)
  }

  const stateChange=(e)=>{
    let allCities=data.filter(city => city.subcountry===e.target.value);
    allCities=[...new Set(allCities.map(cities => cities.name))]
    allCities.sort()
    setCity(allCities)
  }

  //checkers
  const checkDob = () => {
    let flag = 1;
    if (dob === '') {
      document.getElementById('dobErr').innerHTML = 'Enter DOB';
      flag = 0;
    }
    return flag;
  };

  const checkCountry=()=>{
    let c=checkDob();
    let flag=1;
    if (selectedCountry===""){
      document.getElementById("countryErr").innerHTML="Select Country first";
      flag=0;
    }
    return flag;
}
const checkState = () => {
  let c = checkCountry();
  let flag = 1;
  if (selectedState === '') {
    document.getElementById("stateErr").innerHTML = "Select State";
    flag = 0;
  }
  return flag;
};

const checkCity = () => {
  let c = checkState();
  let flag = 1;
  if (selectedCity=== '') {
    document.getElementById('cityErr').innerHTML = "Select City";
    flag = 0;
  }
  return flag;
};
const checkZip = () => { 
  let c = checkCity();
  let flag = 1;
  if (zip === '') {
    document.getElementById('zipErr').innerHTML = 'Enter Zip code';
    flag = 0;
  }
  if ((zip <= 100000) & (zip !== '')) {
    document.getElementById('zipErr').innerHTML = 'Invalid Zip code';
    flag = 0;
  }

  return flag;
};
  const checkStreet = () => {
    let c=checkZip();
    let flag = 1;
    if (street === '') {
      document.getElementById('streetErr').innerHTML = 'Enter street';
      flag = 0;
    }
    return flag;
  };
 

  
  
  return (
    <div className="form-class">
      <h3 style={{"marginLeft":"20px"}}>Welcome {userName} </h3>
      <form className="form">
        <br />
        <label htmlFor="name">DOB*</label>
        <TextField
          id="dob"
          type="date"
          variant="outlined"
          size="small"
          fullWidth
          required
          value={dob}
          onChange={(e) => {
            setDob(e.target.value),
              (document.getElementById('dobErr').innerHTML = '');
          }}
        />
        <br />
        <div id="dobErr" style={{ color: 'red' }}></div>
        <br />
        
        <label>Country*</label>
       <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          label="state"
          displayEmpty
          value={selectedCountry}
          onFocus={checkDob}
          onChange={(e) => {
            setCountry(e.target.value),
            document.getElementById("countryErr").innerHTML="",
            countryChange(e)
          }}
          fullWidth
        >
          <MenuItem  value="" disabled>Select Country</MenuItem>
          {allCountries.map( i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
        </Select>

        <br/>
        <div id="countryErr" style={{"color":"red"}}></div><br/>
        
    <label>State*</label>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          label="state"
          value={selectedState}
          displayEmpty
          onFocus={checkCountry}
          onChange={(e) => {
            setSelectedState(e.target.value),      
            document.getElementById("stateErr").innerHTML="",
            stateChange(e)
            
          }}
          fullWidth
        >
          
          <MenuItem  value="" disabled>Select State</MenuItem>
          {states.map( i => <MenuItem key={i} value={i} >{i}</MenuItem>)}
        </Select>
          <br/>
          <div id="stateErr" style={{"color":"red"}}></div>
          <br/>

        <label>City*</label>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          label="city"
          displayEmpty
          value={selectedCity}
          onFocus={checkState}
          onChange={(e) => {
            setSelectedCity(e.target.value),
            document.getElementById("cityErr").innerHTML=""
            
          }}
          fullWidth
        >
          
          <MenuItem  value="" disabled>Select City</MenuItem>
          {city.map( i => <MenuItem key={i} value={i} >{i}</MenuItem>)}
        </Select>
        <br/>
        <div id="cityErr" style={{"color":"red"}}></div>
        <br/>


<label htmlFor="name">ZipCode*</label>
        <TextField
          type="number"
          id="outlined-basic"
          variant="outlined"
          size="small"
          min="100000"
          max="999999"
          placeholder='ex: 609 005'
          fullWidth
          required
          value={zip}
          onFocus={checkCity}
          onChange={(e) => {
            setZip(e.target.value),
              (document.getElementById('zipErr').innerHTML = '');
          }}
        />
        <br />
        <div id="zipErr" style={{ color: 'red' }}></div>
        <br />

        <label htmlFor="name">Street address*</label>
        <TextField
          id="street"
          variant="outlined"
          size="small"
          fullWidth
          required
          value={street}
          placeholder="ex: Clinton gardens, NYC"
          onFocus={checkZip}
          onChange={(e) => {
            setStreet(e.target.value),
              (document.getElementById('streetErr').innerHTML = '');
          }}
        />
        <br />
        <div id="streetErr" style={{ color: 'red' }}></div>
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Save & Continue
        </Button>
      </form>
      <br/>
      <progress value={100} max={100} id="progressbar">1</progress>
    </div>
  );
};
