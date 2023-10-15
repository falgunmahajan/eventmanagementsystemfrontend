import React, { useState } from 'react'
import { Alert, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import Navbar from '../Navbar'
import image from "../../Images/footerBackground.jpeg"
import Footer from "../Footer"
import { Grid } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../baseUrl'
export default function Admin() {
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
      const res = await axios.post(`${baseUrl}/api/login`,user);
      const data = await res.data
      localStorage.setItem("user",JSON.stringify(data))
      console.log(data)
      setError(false)
      navigate("/admin/dashboard")
  }
  catch (err) {
      console.log(err)
      setError("Invalid Email or Password")
  }
}
  return (
    <div>
       <Navbar />
       <div style={{minHeight:"75vh", display:"flex", alignItems:"center"}}>
       <Grid container spacing={2} >
            <Grid item xs={8} md={4} sx={{ mx: "auto", my: 10, pb: 2, pr: 2, backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
            {error && <Alert severity="error" sx={{fontSize:16, fontWeight:"bold"}}>{error}</Alert>}
                <form onSubmit={handleSubmit} className="bg-white p-4 w-100 my-2">
                    <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
                        Sign In
                    </Typography>
                    <TextField id="outlined-basic" label="Enter Email" variant="outlined" fullWidth required sx={{ mt: 2 }} name="Email"  onChange={handleInput} />
                    <TextField
                     type={show?"text":"password"}
                     id="outlined-basic" 
                     label="Enter Password" 
                     variant="outlined" fullWidth required 
                     sx={{ mt: 2 }} name="Password" onChange={handleInput}
                     InputProps={{  endAdornment:
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShow(!show)}
                            edge="end"
                          >
                            {show ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>} } />
                    
                    <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover':{backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Sign In</Button>
                </form>
         
            </Grid>
        </Grid>
        </div>
       <Footer/> 
    </div>
  )
}
