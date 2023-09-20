import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Grid,  Typography } from '@mui/material'
import { ClipLoader } from 'react-spinners';
import TableComponent from '../TableComponent'
import { cloneDeep } from 'lodash';
const ViewBooking = () => {
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
          if (user.data.validUser.Role == "Customer") {
            console.log(user.data.validUser._id)
            const res = await axios.get(`/api/getBookedData/${user.data.validUser._id}`);
            console.log(res.data);
           let requiredData=(res.data).map((item) => cloneDeep(item)).map(item=>{
            delete item._id;
            delete item.__v;
            delete item.CustomerName;
            delete item.CustomerId;
            delete item.ServiceProviderId;
            delete item.PhoneNumber;
            delete item.GoldenParameters;
            delete item.AddonsParameters;
            const start=new Date(item.BookingStartDate);
            const end=new Date(item.BookingEndDate);
 item.BookingStartDate=`${`0${start.getDate()}`.slice(-2)}-${`0${start.getMonth()+1}`.slice(-2)}-${start.getFullYear()
            }`; 
            item.BookingEndDate=`${`0${end.getDate()}`.slice(-2)}-${`0${end.getMonth()+1}`.slice(-2)}-${end.getFullYear()}`
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
        path="/"
      />
    
       <div style={{minHeight:"75vh"}}>
      <Grid container >
      <Grid item xs={12} sx={{textAlign:"center"}}>
            <Typography variant="h4" component="div" sx={{my:5}}>Booked Services Details</Typography></Grid>
            <Grid item xs={8} md={4} sx={{m:"auto"}}>
            {loading && <div style={{textAlign:"center", marginTop:100}}>
       <ClipLoader  loading={loading} />
       </div> }
       </Grid>
       {data && 
        <Grid item xs={12} md={10} sx={{mx:'auto',mb:10}}>
           {(data.length) ? <TableComponent data={data}/>:
           <Typography variant="h5" sx={{textAlign:"center"}}>You have not Booked any services yet.</Typography>}
        </Grid>
        
       }
      </Grid>
      </div>
      <Footer/>
    </div>
  )
}

export default ViewBooking
