import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableComponent from '../TableComponent';
import { Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { baseUrl } from '../../baseUrl';

const Services = () => {
    const [service,setService]=useState("");
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
       (async()=>{
        const res = await axios.get(`${baseUrl}/api/getService`)
       let data= (res.data).map(item=>{
              delete item._id;
              delete item.__v;
              delete item.createdAt;
        delete item.updatedAt
              return item;
               })
       console.log(data)
        setService(data)
        setLoading(false)
       } )();
    },[])
  return (
    <div>
        <div style={{textAlign:"center"}}>
       <ClipLoader  loading={loading} />
       </div> 
        {service && 
        <>
         <Typography component="div" variant="h3" align="center" sx={{mb:2}}>Services</Typography>
        <TableComponent data={service}/>
        </>}
    
    </div>
  )
}

export default Services
