import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import TableComponent from '../TableComponent';

const ServiceProvider = () => {
    const [serviceProvider,setServiceProvider]=useState("");
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
       (async()=>{
        const res = await axios.get("/api/getServiceProvider")
       let data= (res.data).map(item=>{
              delete item._id;
              delete item.__v;
              delete item.Password;
              return item;
               })
       console.log(data)
       setServiceProvider(data)
        setLoading(false)
       } )();
    },[])
  return (
    <div>
       <div style={{textAlign:"center"}}>
       <ClipLoader  loading={loading} />
       </div> 
        {serviceProvider && 
        <>
         <Typography component="div" variant="h3" align="center" sx={{mb:2}}>Service Provider</Typography>
        <TableComponent data={serviceProvider}/>
        </>}
    </div>
  )
}

export default ServiceProvider
