import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

const Details = ({bookedData,role}) => {
console.log(bookedData)

const start=new Date(bookedData.BookingStartDate);
const end=new Date(bookedData.BookingEndDate);
// console.log((`${`0${end.getDate()}`.slice(-2)}-${`0${end.getMonth()+1}`.slice(-2)}-${end.getFullYear()}`))
// bookedData.BookingStartDate=`${`0${start.getDate()}`.slice(-2)}-${`0${start.getMonth()+1}`.slice(-2)}-${start.getFullYear()
// }`; 
// bookedData.BookingEndDate=`${`0${end.getDate()}`.slice(-2)}-${`0${end.getMonth()+1}`.slice(-2)}-${end.getFullYear()}`

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
            <Typography>Start Date : {bookedData.BookingStartDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Typography sx={{ textAlign: "end" }}>
              End Date : {bookedData.BookingEndDate}
            </Typography>
          </Grid>
        </Grid>

      
        <Typography variant="body1" sx={{ ml: 5 }}>
          <Grid container>
           { role==="Customer" &&<Grid item xs={6}>
              <b>Service :</b> { bookedData.ServiceName}{" "}
            </Grid>}
            <Grid item xs={6}>
              <b>{role==="Customer"?"Service Provider":"Customer"} :</b> {role==="Customer"?bookedData.ServiceProviderName:bookedData.CustomerName}
            </Grid>
            {role==="Service Provider"&&<><Grid item xs={6}>
              <b>Phone Number :</b> {bookedData.PhoneNumber}
            </Grid>
            <Grid item xs={6}>
              <b>Address:</b> {bookedData.Address}
            </Grid></>}
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
            {bookedData.AddonsParameters &&
              Object.keys(bookedData.AddonsParameters).map((key) => {
                return (
                  <>
                    <Grid item xs={6}>
                      <b>{key} :</b> {bookedData.AddonsParameters[key].value}
                    </Grid>
                  </>
                );
              })}
               {bookedData.Quantity && (
              <Grid item xs={6}>
                {" "}
                <b>Quantity:</b> {bookedData.Quantity}
              </Grid>
            )}
          </Grid>
        </Typography>
    

          <br />

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
          Total Price : {bookedData.TotalPrice}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  return (
    <div>
      <Navbar first="Home" fourth="ViewBooking" path="/" />
      <Box sx={{ width: "50%", p: 5, minHeight: "70vh", mx: "auto", my: 8 }}>
      <Typography variant="h3" sx={{ mb:5, textAlign: "center" }}>
          Service Details
        </Typography>
        <Card variant="outlined" sx={{ border: 1, borderColor: "divider" }}>
          {card}
        </Card>
        </Box>
      <Footer/>
    </div>
  )
}

export default Details
