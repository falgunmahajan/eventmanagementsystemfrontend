import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Booking = ({ bookedData, setBookedData }) => {
  const navigate=useNavigate()
  const [editNo, setEdit] = useState(false);
  const [contactError,setContactError]=useState(false)
  const [open, setOpen] = useState(false);
 const [msg,setMsg]=useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setBookedData()
    navigate(`/`)

  };
  const card = (
    bookedData &&
    <React.Fragment>
      <CardContent>
        <Grid
          container
          sx={{
            fontSize: 14,
            backgroundColor: "#01579b",
            color: "white",
            p: 1,
            mb: 2,
          }}
        >
          <Grid item xs={6}>
            {" "}
            <Typography>Start Date : {bookedData["Start Date"]}</Typography>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Typography sx={{ textAlign: "end" }}>
              End Date : {bookedData["End Date"]}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" component="div"></Typography>
        <Typography variant="h5" sx={{ mb: 1.5, textAlign: "center" }}>
          Service Details
        </Typography>
        <Typography variant="body1" sx={{ ml: 5 }}>
          <Grid container>
            <Grid item xs={6}>
              <b>Service :</b> {bookedData.Service}{" "}
            </Grid>
            <Grid item xs={6}>
              <b>Service Provider :</b> {bookedData.ServiceProviderName}
            </Grid>
            {Object.keys(bookedData.GoldenParameters).map((key) => {
              if (key !== "Price")
                return (
                  <>
                    <Grid item xs={6}>
                      <b>{key} :</b> {bookedData.GoldenParameters[key]}
                    </Grid>
                  </>
                );
            })}
            {bookedData.AddOnsParameter &&
              Object.keys(bookedData.AddOnsParameter).map((key) => {
                return (
                  <>
                    <Grid item xs={6}>
                      <b>{key} :</b> {bookedData.AddOnsParameter[key].value}
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, mb: 1.5, textAlign: "center" }}>
          Customer Details
        </Typography>
        <Typography variant="body1" sx={{ ml: 5 }}>
          <Grid container>
            <Grid item xs={6}>
              <b>Customer :</b> {bookedData.CustomerName}
            </Grid>
            <Grid item xs={6}>
              <b>Contact Number:</b> {bookedData.CustomerContact}
            </Grid>
            <Grid item xs={6}>
              {" "}
              <b>Address:</b> {bookedData.Location.Name}
            </Grid>
            {bookedData.Quantity && (
              <Grid item xs={6}>
                {" "}
                <b>Quantity:</b> {bookedData.Quantity}
              </Grid>
            )}
          </Grid>

          <br />
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            backgroundColor: "#01579b",
            color: "white",
            p: 1,
            textAlign: "end",
            mt: 2,
          }}
        >
          Total Price : {bookedData["Total Price"]}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const contactValid=(e)=>{
    if((/^[0-9]{10}$/).test(e.target.value))
    {
            setContactError(false)
            setBookedData({...bookedData,CustomerContact:e.target.value})
    }
    else{
        setContactError(true)
    }
}
const handleSubmit=async()=>{
    if(!contactError)
    {
       
       try{
        console.log(bookedData)
        delete bookedData.GoldenParameters.Price
        Object.keys(bookedData.AddOnsParameter).map(key=>{
         delete bookedData.AddOnsParameter[key].price
        })
        const res=await axios.post("/api/registerBookedCustomer",bookedData)
        console.log(res.data)
            setMsg(res.data.message)
       }
       catch(err)
       {
        console.log(err)
        setMsg("Something went wrong")
       }
      handleClickOpen()
        
    }
}
  console.log(bookedData);
  return (
    <div>
      <Navbar first="Home" fourth="ViewBooking" path="/" />
      <Box sx={{ width: "50%", p: 5, minHeight: "75vh", mx: "auto", my: 8 }}>
        <Card variant="outlined" sx={{ border: 1, borderColor: "divider" }}>
          {card}
        </Card>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"end"}}>
        {!editNo && <Button variant="contained" type="button" sx={{ml:"auto", mt:3}} onClick={()=>setEdit(true)} >Edit Number</Button>}
      {editNo && <TextField
        error={contactError}
        type="tel"
        id="outlined-basic"
        label="Enter Contact"
        variant="outlined"
    
        inputProps={{ maxLength: 10 }}
        sx={{ml:"auto", mt: 2, width:"50%" }}
        name="Contact"
        onChange={contactValid}
      />}
      {contactError && (
        <span className="text-danger text-end" >Please Enter the Valid Contact Number</span>
      )}
        <Button variant="contained" type="submit"  sx={{ backgroundColor: "#d23838", '&:hover': { backgroundColor: "#d23838" }, my: 3,ml:"auto", textTransform: "none", fontSize: 16 }} onClick={handleSubmit}>Book Services</Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
      </Box>
     
      <Footer />
    </div>
  );
};

export default Booking;
