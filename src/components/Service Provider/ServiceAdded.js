import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Grid,  Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
import TableComponent from '../TableComponent'

const ServiceAdded = () => {
    const navigate=useNavigate();
const [data,setData]=useState()
const[loading,setLoading]=useState(true)
useEffect(()=>{
(async()=>{
    let user;
    try {
      user = await axios.get("/api/validUser");
      console.log(user.data);
    } catch (err) {
      user = "";
    }
    if (!user) {
      navigate("/");
    } else {
      if (user.data.validUser.Role == "Service Provider") {
        console.log(user.data.validUser._id)
        const res = await axios.get(`/api/getServiceData?id=${user.data.validUser._id}`);
        console.log(res.data);
       let requiredData=(res.data).map(item=>{
        delete item._id;
        delete item.__v;
        delete item.Service;
        delete item.ServiceAddedBy;
        delete item.ServiceProviderName;
        return item;
         })
         setData(requiredData)
        setLoading(false)
      }
      else{
        navigate("/");
      }
    }
})();
},[])
  return (
    <div>
      <Navbar
        first="Home"
        second="ViewBooking"
        third="ServicesAdded"
        path="/serviceProvider/"
      />
     {loading && <div style={{textAlign:"center", marginTop:100}}>
       <ClipLoader  loading={loading} />
       </div> }
       <div style={{minHeight:"75vh"}}>
      <Grid container >
      
       {data && 
       <>
        <Grid item xs={12} sx={{textAlign:"center"}}>
            <Typography variant="h4" component="div" sx={{my:5}}>Services Added Details</Typography></Grid>
        <Grid item xs={12} md={10} sx={{mx:'auto',my:5}}>
            <TableComponent data={data}/>
        </Grid>
        </>
       }
      </Grid>
      </div>
      <Footer/>
    </div>
  )
}

export default ServiceAdded
