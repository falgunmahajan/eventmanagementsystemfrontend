import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import axios from 'axios';
import { Grid } from '@mui/material';
import CardComponent from '../CardComponent';

const ServiceProviderDashboard = () => {
    const [services, setServices] = useState("");
    useEffect(() => {
      (async () => {
        const res1 = await axios.get("/api/getService")
        console.log(res1)
        setServices(res1.data)
      })();
    }, [])
  return (
    <div>
      <Navbar first="Home" second="ViewBooking" third="ServicesAdded" path="/serviceProvider/"/>
      <Grid container sx={{ margin: "auto", px: 3, my:8 }}>
          {services && services.map(item => {
            return <Grid item xs={6} md={3} >
              <CardComponent width={300} imgSrc={`http://localhost:8080/${item.ImageUrl}`} title={item.Service} />
            </Grid>
          })}

        </Grid>
      <Footer/>
    </div>
  )
}

export default ServiceProviderDashboard
