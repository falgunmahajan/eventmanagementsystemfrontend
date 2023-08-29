import React, { useEffect, useState } from 'react'
import image from "../../Images/footerBackground.jpeg"
import { Alert, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Add } from '@mui/icons-material'

const AddParameters = () => {
  const [parameters,setParameters]=useState({
    Services:"",
    TypeOfParameter:"",
    Parameters:[]
  })
  const [inputField,setInputField]=useState([0])
  const [services, setServices] = useState("")
  const [success, setSuccess] = useState(false)
  const[error,setError]=useState(false);

  useEffect(()=>{
   ( async()=>{
    
    const res1 = await axios.get("/api/getService")
    console.log(res1.data)
    setServices(res1.data)
   })()
  },[])
  // const handleInput = (e) => {
  //   setParameters({
  //       ...parameters,
  //       [e.target.name]: e.target.value
  //   })
  
    // console.log(parameters)
// }
const handleSubmit=async(e)=>{

  e.preventDefault();
  try{
    const res=await axios.post("/api/addParameters",parameters);
    console.log(res.data)
    setError(false)
    setSuccess("Your Services is successfully added")
    setInputField([0])
     setParameters({Services:"",
     TypeOfParameter:"",
     Parameters:[]})
     e.target.reset();
  
  }
 


catch(err){
setSuccess(false)
setError("Something Went wrong")
}

}
  return (
    <div>
       <Grid container spacing={2}   >
            <Grid item xs={8} md={5} sx={{ mx: "auto", my:4, pb: 2, pr: 2, backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
            {success && <Alert severity="success" sx={{fontSize:16, fontWeight:"bold"}}>{success}</Alert>}
      {error && <Alert severity="error" sx={{fontSize:16, fontWeight:"bold"}}>{error}</Alert>}
                <form onSubmit={handleSubmit}  className="bg-white p-4 w-100 my-2">
                    <Typography variant="h4" component="div" sx={{ textAlign: "center" , color:"#9e9e9e" }}>
                        Add Parameter Form
                    </Typography>
                    <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Select Services</InputLabel>
                    {services &&<Select
                           name="Services"
                            labelId="demo-simple-select-label"
                            label="Select Services"
                           value={parameters.Services}
                            fullWidth
                            required
                            onChange={(e)=>setParameters({...parameters,Services:e.target.value})}
                            
                        >
                          {services.map(item=>{
                            return <MenuItem value={item.Service}>{item.Service}</MenuItem>
                          })}
                        </Select>}
                        <InputLabel id="demo-simple-select-label"  sx={{ mt: 2 }}>Type of Parameters</InputLabel>
                    <Select
                           name="Type Of Parameter"
                            labelId="demo-simple-select-label"
                            label="Type of Parameters"
                           value={parameters.TypeOfParameter}
                            fullWidth
                            required
                            onChange={(e)=>setParameters({...parameters,TypeOfParameter:e.target.value})}
                            
                        >
                        <MenuItem  value="GoldenParameters">Golden Parameters</MenuItem>
                        <MenuItem  value="AddOnsParameters">AddOns Parameters</MenuItem> 
                        </Select>
                        {inputField.map(item=>{
                          return  <TextField
                          type="text"
                          id="outlined-basic" 
                          label="Enter Parameter " 
                          variant="outlined" fullWidth required 
                          // value={parameters.Parameters[item]}
                          sx={{ mt: 2 }} name="Parameters"  onBlur={(e)=>{
                            console.log(e.target.value)
                           const addedparameters=[...parameters.Parameters,e.target.value]
                           setParameters({...parameters,Parameters:addedparameters})
                          }} />
                        })}
                   
                    
                   <Button variant="contained" startIcon={<Add/>} onClick={()=>setInputField([...inputField,inputField+1])} sx={{my: 3, textTransform: "none", fontSize: 16 }}>Add</Button>
                    <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover':{backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Submit</Button>
                </form>
                </Grid>
                </Grid>
    </div>
  )
}

export default AddParameters
