import { Add } from '@mui/icons-material';
import { Alert, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image from "../../Images/footerBackground.jpeg"
import { baseUrl } from '../../baseUrl';

const AddOptions = () => {
  const [inputField,setInputField]=useState([0])
  const [services, setServices] = useState("")
  const [parameters, setParameters]=useState("")
  const [success, setSuccess] = useState(false)
  const[error,setError]=useState(false);
  const [options,setOptions]=useState({
    Services:"",
    TypeOfParameter:"",
    Parameter:"",
    Options:[]
  })
  useEffect(()=>{
    ( async()=>{
     
     const res1 = await axios.get(`${baseUrl}/api/getService`)
     console.log(res1.data)
     setServices(res1.data)
    })()
   },[])
   const getParameters=async()=>{
    console.log(options.Services,options.TypeOfParameter)
    if(options.Services && options.TypeOfParameter)
    {
      console.log("hello")
      const res = await axios.get(`${baseUrl}/api/getParameters?Service=${options.Services}&TypeOfParameter=${options.TypeOfParameter}`)
     setParameters(res.data)
   }
  }
  const handleSubmit=async(e)=>{

    e.preventDefault();
    console.log(options)
    try{
      
    const res= await axios.post(`${baseUrl}/api/addOptions`,options)
    console.log(res.data)
      setError(false)
      setSuccess("Your Services is successfully added")
      setInputField([0])
       setOptions({
        Services:"",
        TypeOfParameter:"",
        Parameter:"",
        Options:[]
      })
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
                        Add Options Form
                    </Typography>
                    <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Select Services</InputLabel>
                    <Select
                           name="Services"
                            labelId="demo-simple-select-label"
                            label="Select Services"
                           value={options.Services}
                            fullWidth
                            required
                            onChange={(e)=> setOptions({...options,Services:e.target.value})}
                            onBlur={getParameters}
                        >
                          {services &&services.map(item=>{
                            return <MenuItem value={item.Service}>{item.Service}</MenuItem>
                          })}
                        </Select>
                        <InputLabel id="demo-simple-select-label"  sx={{ mt: 2 }}>Type of Parameters</InputLabel>
                    <Select
                           name="Type Of Parameter"
                            labelId="demo-simple-select-label"
                            label="Type of Parameters"
                           value={options.TypeOfParameter}
                            fullWidth
                            required
                            onChange={(e)=> setOptions({...options,TypeOfParameter:e.target.value})}
                            onBlur={getParameters}
                        >
                        <MenuItem  value="Golden Parameters">Golden Parameters</MenuItem>
                        <MenuItem  value="AddOns Parameters">AddOns Parameters</MenuItem> 
                        </Select>
                        <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Select Parameter</InputLabel>
                   <Select
                           name="Services"
                            labelId="demo-simple-select-label"
                            label="Select Parameter"
                           value={options.Parameter}
                            fullWidth
                            required
                            onChange={(e)=>setOptions({...options,Parameter:e.target.value})}     
                        >
                           {parameters && parameters.map(item=>{
                            return <MenuItem value={item}>{item}</MenuItem>
                          })}
                        </Select>
                        {inputField.map(item=>{
                          return  <TextField
                          type="text"
                         
                          label="Enter Options " 
                          variant="outlined" fullWidth required 
                          value={options.Options[item]}
                          sx={{ mt: 2 }} name="Options" 
                           onChange={(e)=>{
                
                           const addedOptions=[...(options.Options).slice(0,item),e.target.value,...(options.Options).slice(item+1)]
                           setOptions({...options,Options:addedOptions})
                           console.log(item,options.Options[item], e.target.value)
                          }} 
                          />
                        })}
                   
                    
                   <Button variant="contained" startIcon={<Add/>} onClick={()=>setInputField([...inputField,inputField[inputField.length-1]+1])} sx={{my: 3, textTransform: "none", fontSize: 16 }}>Add</Button>
                    <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover':{backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Submit</Button>
                </form>
                </Grid>
                </Grid>
    </div>
  )
}

export default AddOptions
