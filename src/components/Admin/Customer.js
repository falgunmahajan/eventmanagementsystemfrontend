import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableComponent from '../TableComponent';
import { ClipLoader } from 'react-spinners';
import { baseUrl } from '../../baseUrl';

const Customer = () => {
    const [customer,setCustomer]=useState("");
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
       (async()=>{
        const res = await axios.get(`${baseUrl}/api/getCustomer`)
       let data= (res.data).map(item=>{
              delete item._id;
              delete item.__v;
              delete item.Role;
              delete item.Password;
              return item;
               })
       console.log(data)
        setCustomer(data)
        setLoading(false)
       } )();
    },[])
  return (
    <div>
      <div style={{textAlign:"center"}}>
       <ClipLoader  loading={loading} />
       </div> 
        {customer && 
        <>
         <Typography component="div" variant="h3" align="center" sx={{mb:2}}>Customers</Typography>
        <TableComponent data={customer}/>
        </>}
    </div>
  )
}

export default Customer
