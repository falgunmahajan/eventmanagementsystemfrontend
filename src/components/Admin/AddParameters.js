import React from 'react'
import image from "../../Images/footerBackground.jpeg"
import { Button, Grid, TextField, Typography } from '@mui/material'

const AddParameters = () => {
  return (
    <div>
       <Grid container spacing={2}   >
            <Grid item xs={8} md={5} sx={{ mx: "auto", my:4, pb: 2, pr: 2, backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      {/* {error && <Alert severity="error" sx={{fontSize:16, fontWeight:"bold"}}>{error}</Alert>} */}
                <form  className="bg-white p-4 w-100 my-2">
                    <Typography variant="h4" component="div" sx={{ textAlign: "center" , color:"#9e9e9e" }}>
                        Add Parameter Form
                    </Typography>
                    <TextField id="outlined-basic" label="Service Name" variant="outlined" fullWidth required sx={{ mt: 2 }} name="Service"   />
                    <TextField
                     type="text"
                     id="outlined-basic" 
                     label="Image URL" 
                     variant="outlined" fullWidth required 
                     sx={{ mt: 2 }} name="ImageURL"  />
                    
                    <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover':{backgroundColor: "#d23838" }, my: 3, textTransform: "none", fontSize: 16 }}>Submit</Button>
                </form>
                </Grid>
                </Grid>
    </div>
  )
}

export default AddParameters
