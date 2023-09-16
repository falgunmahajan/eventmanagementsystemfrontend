import React, { useState } from 'react'
import Navbar from './Navbar'
import { Alert, Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import image from "../Images/footerBackground.jpeg"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState("")
    const [error,setError]=useState(false)
    const [show,setShow]=useState(false)
    const [nameError,setNameError]=useState(false)
    const [contactError,setContactError]=useState(false);
    const [emailError,setEmailError]=useState(false)
    const [passwordError,setPasswordError]=useState(false)
    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user)
    }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(user)
  
    try {
        const res = await axios.post("/api/signup",user);
        const data = await res.data
        console.log(data)
        setError(false)
        navigate("/SignIn")
    }
    catch (err) {
        console.log(err)
        setError("This Email is already registered")
    }
  }
  const nameValid=(e)=>{
    if((/^[a-z A-z]+$/).test(e.target.value))
    {
            setNameError(false)
            handleInput(e)
    }
    else{
        setNameError(true)
    }
  }
  const contactValid=(e)=>{
    if((/^[0-9]{10}$/).test(e.target.value))
    {
            setContactError(false)
            handleInput(e)
    }
    else{
        setContactError(true)
    }
  }
  const emailValid=(e)=>{
    if((/^([\._A-Za-z0-9]+)@([A-Za-z0-9]+)\.([a-z]{2,6})$/).test(e.target.value))
    {
            setEmailError(false)
            handleInput(e)
    }
    else{
        setEmailError(true)
    }
  }
  const passwordValid=(e)=>{
    if((e.target.value).length>=8)
    {
            setPasswordError(false)
            handleInput(e)
    }
    else{
        setPasswordError(true)
    }
  }
  const disabled=()=>{
   return nameError || contactError || emailError || passwordError
  }
  
    return (
        <div>
            <Navbar first="Home" second="SignUp" third="SignIn" path="/"  />
            <Grid container spacing={2}   >
                <Grid item xs={8} md={4} sx={{ mx: "auto", my: 10, pb: 2, pr: 2, backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
                    {error && <Alert severity="error" sx={{ fontSize: 16, fontWeight: "bold" }}>{error}</Alert>}
                    <form onSubmit={handleSubmit}  className="bg-white p-4 w-100 my-2">
                        <Typography variant="h3" component="div" sx={{ textAlign: "center",mb:2 }}>
                            Sign Up
                        </Typography>
                        <InputLabel id="demo-simple-select-label">Select Your Role</InputLabel>
                        <Select
                           name="Role"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Your Role"
                            fullWidth
                            required
                            onChange={handleInput}
                            
                        >
                            <MenuItem value="Service Provider">Service Provider</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                        </Select>
                        <TextField error={nameError} id="outlined-basic" label="Enter Name" variant="outlined" fullWidth required   sx={{ mt: 2 }} name="Name" onChange={nameValid} 
                        inputProps={{ "data-testid": "name" }} />
                        {nameError && <span class="text-danger">Please Enter the Valid Name</span>}
                        <TextField error={contactError} type="tel" id="outlined-basic" label="Enter Contact" variant="outlined" fullWidth required inputProps={{ maxLength: 10 , "data-testid": "contact" }} sx={{ mt: 2 }} name="Contact"  onChange={contactValid}/>
                        {contactError && <span class="text-danger">Please Enter the Valid Contact Number</span>}
                        <TextField error={emailError} id="outlined-basic" label="Enter Email" variant="outlined" fullWidth required sx={{ mt: 2 }} name="Email" onChange={emailValid}
                         inputProps={{ "data-testid": "email" }}  />
                        {emailError && <span class="text-danger">Please Enter the Valid Email Id</span>}
                        <TextField
                            type={show ? "text" : "password"}
                            error={passwordError}
                            id="outlined-basic"
                            label="Enter Password"
                            variant="outlined" fullWidth required
                            sx={{ mt: 2 }} name="Password" 
                            onChange={passwordValid}
                            InputProps={{
                                "data-testid": "password",
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShow(!show)}
                                            edge="end"
                                        >
                                            {show ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                             {passwordError && <span class="text-danger">Password must be atleast 8 characters long</span>}
                        <Button variant="contained" type="submit" disabled={disabled()} fullWidth sx={{ backgroundColor: "#d23838", '&:hover': { backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Sign Up</Button>
                    </form>
                    <p className='text-white text-center mt-2'>If you have already registered please signin <br />
                    <Link to="/SignIn" style={{color:"white", textDecoration:"none"}}>SignIn</Link>
                    </p>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default SignUp
