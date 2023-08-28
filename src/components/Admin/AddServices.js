import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import image from "../../Images/footerBackground.jpeg"
import axios from 'axios';
const AddServices = () => {
    const [service, setService] = useState("");
    const [imageFile,setImageFile]=useState([])
    const [success, setSuccess] = useState(false)
    const[error,setError]=useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
const formData=new FormData();
formData.append("Service",service)
formData.append("Image",imageFile)
try{
  const res=await axios.post("/api/addServices",formData)
  setError(false)
  setSuccess("Your Services is successfully added")
  setService("")
 document.querySelector("form").reset()
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
                        Add Service Form
                    </Typography>
                    <TextField id="outlined-basic" label="Service Name" variant="outlined" fullWidth required sx={{ mt: 2 }} name="Service" value={service} onChange={e=>setService(e.target.value)}   />
                    <TextField
                     type="file"
                     variant='standard'
                     fullWidth required 
                     sx={{ mt: 2 }} name="Image" files={imageFile}  onChange={e=>setImageFile(e.target.files[0])} />
                    
                    <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover':{backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Submit</Button>
                </form>
                </Grid>
                </Grid>
    </div>
  )
}

export default AddServices
