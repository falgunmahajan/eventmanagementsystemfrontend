import React, { useState } from 'react'
import Navbar from './Navbar'
import { Alert, Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import image from "../Images/footerBackground.jpeg"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
    const navigate=useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(false)
    const [show,setShow]=useState(false)
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
        const res = await axios.post("/api/login",user);
        const data = await res.data
        console.log(data)
        setError(false);
        (data.user.Role=="Customer")? navigate("/"):navigate("/serviceProvider")
       
    }
    catch (err) {
        console.log(err)
        setError("Invalid Email or Password")
    }
  }
    return (
        <div>
            <Navbar first="Home" second="SignUp" third="SignIn" path="/"  />
            <Grid container spacing={2} sx={{minHeight:"75vh"}}  >
                <Grid item xs={8} md={4} sx={{ mx: "auto", my: 10, pb: 2, pr: 2, backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
                    {error && <Alert severity="error" sx={{ fontSize: 16, fontWeight: "bold" }}>{error}</Alert>}
                    <form onSubmit={handleSubmit}  className="bg-white p-4 w-100 my-2">
                        <Typography variant="h3" component="div" sx={{ textAlign: "center",mb:2 }}>
                            Sign In
                        </Typography>
                        <InputLabel id="demo-simple-select-label" required>Select Your Role</InputLabel>
                        <Select
                        required
                           name="Role"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            
                            fullWidth
                            onChange={handleInput}
                        >
                            <MenuItem value="Service Provider">Service Provider</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                        </Select>
                        <TextField id="outlined-basic" label="Enter Email" variant="outlined" fullWidth required sx={{ mt: 2 }} name="Email"  onChange={handleInput}  />
                        <TextField
                            type={show ? "text" : "password"}
                            id="outlined-basic"
                            label="Enter Password"
                            variant="outlined" fullWidth required
                            sx={{ mt: 2 }} name="Password" 
                            onChange={handleInput}
                            InputProps={{
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

                        <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover': { backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Sign In</Button>
                    </form>
                    <p className='text-white text-center mt-4'>If you have not registered yet please register yourself <br />
                    <Link to="/SignUp" style={{color:"white", textDecoration:"none"}}>SignUp</Link>
                    </p>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default SignIn
