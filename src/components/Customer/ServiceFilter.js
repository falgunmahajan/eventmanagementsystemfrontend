import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import TableComponent from '../TableComponent';
import Form from './Form';
import { cloneDeep } from 'lodash';
const ServiceFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const[loading,setLoading]=useState(true)
    const [dataLoading,setDataLoading]=useState(false)
    const service=searchParams.get("service")
    const [GoldenParameters, setGoldenParameters] = useState("");
    const [AddOnsParameters, setAddOnsParameters] = useState("");
    
    const [locations,setLocations]=useState()
    const [checkBoxData,setCheckBoxdata]=useState([])
    const [data,setData]=useState()
    const [filteredData, setFilteredData]=useState()
    const [item,setItems]=useState()
    // const [error,setError]=useState(false)
    // const [success,setSuccess]=useState(false)
    // const [initial,setInitial]=useState()
    const navigate=useNavigate("")
    
   
    
    console.log(service);
    useEffect(() => {
      (async () => {
        let user;
        try {
          user = await axios.get("/api/validUser");
          console.log(user.data);
          console.log(service)
          const userData=user.data.validUser;
          console.log(userData)
        } catch (err) {
          user = "";
        }
        if (!user) {
          navigate("/");
        } else {
          if (user.data.validUser.Role == "Customer") {
        const res = await axios.get(`/api/getServiceOptions?service=${service}`);
        const {GoldenParameter,AddOnsParameter}=res.data;
        console.log(GoldenParameter,AddOnsParameter)
        setGoldenParameters(GoldenParameter);
        setAddOnsParameters(AddOnsParameter);
        setLoading(false);
        const response = await axios.get("/api/getLocations")
        setLocations(response.data)
        console.log(response.data)
        const GoldenArray=GoldenParameter && GoldenParameter.map(item=>{
          return item.Options.map(subItem=>{
          return {ischecked:false,value:subItem,name:item.Parameter,type:"GoldenParameter"}
          })
         })
         const AddOnsArray=AddOnsParameter && AddOnsParameter.map(item=>{
          return item.Options.map(subItem=>{
          return {ischecked:false,value:subItem,name:item.Parameter,type:"AddOnsParameter"}
          })
         })
         const initialState=[...GoldenArray,...AddOnsArray]
         console.log(initialState)
      setCheckBoxdata([...initialState])
    //   setInitial([...initialState])
    const resp = await axios.get(`/api/getServiceData?service=${service}`);
    const requiredResp=(resp.data).map(item=>{
      delete item._id;
      delete item.__v;
      delete item.Service;
      delete item.ServiceAddedBy;
      return item;
       })
    setData(requiredResp);
          }
        else{
          navigate("/");
        }}
      })();
    }, []);
    console.log(GoldenParameters, AddOnsParameters);
    console.log(checkBoxData)
   const selectOneCheckbox=(e,divIndex,checkBoxIndex)=>
   {
    console.log(divIndex,checkBoxIndex)
    console.log(checkBoxData[0])
    const updatedCheckboxData=checkBoxData.map((div,index)=>{
      console.log("index",index)
      if(index==divIndex)
      {
        return div.map((checkbox,ind)=>{
          console.log(ind)
          if(ind==checkBoxIndex)
          {
            if(e.target.checked)
            {
              return{
              ...checkbox,
              ischecked:true
            };}
          }
          return{
            ...checkbox,
            ischecked:false
          };
        })
      }
      return div;
    })
    
    setCheckBoxdata(updatedCheckboxData)
    
getFilter(updatedCheckboxData);

   }
   const getFilter=(checkBoxData)=>{
    console.log(checkBoxData)
      const filter= checkBoxData.map(item=>{
 return item.filter(subItem=>{
      if(subItem.ischecked)
      {
        return subItem;
      }
    })
   })
   console.log(data)
   console.log(filter)
   const filteredarray=[].concat(...filter)
   console.log(filteredarray)
  const filterData=data.filter(item=>{
    console.log(item)
        return filteredarray.every(filter=>{
          if(filter.type=="GoldenParameter")
          {
          return  item.GoldenParameters[filter.name]==filter.value
          }
          if(filter.type=="AddOnsParameter")
          {
          return  item.AddOnsParameter[filter.name].value==filter.value
          }
        })
  }).map(item=>cloneDeep(item))
  console.log(filterData)
  const finalData=filterData.map(item=>{
    const keys={}
   Object.keys(item.AddOnsParameter).map(key=>{
     filteredarray.map(subitem=>{
          if(subitem.name!==key)
          {
            keys[key]=true;
          }
         
      })
     
    })
    console.log(keys)
    Object.keys(keys).map(subkey=>{
      if(!keys[subkey])
      {
           delete item.AddOnsParameter[subkey]
      }
    })
    return item
  }).map(item=>cloneDeep(item))
  
  console.log(finalData)
  setFilteredData(finalData)
   }
  return (
    <div>
      <Navbar first="Home"  fourth="ViewBooking" path="/" />
      {loading && <div style={{textAlign:"center", marginTop:100}}>
       <ClipLoader  loading={loading} />
       </div>}
       <div style={{minHeight:"75vh"}}>
       {!loading && <Grid container spacing={2} sx={{minHeight:"75vh", my:4, pl:10}}>
        <Grid item xs={6} md={3} sx={{px:"10px"}}>
            <Typography variant="h4">Fiters</Typography>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Select Locations</InputLabel>
                    <Select
                           name="Services"
                            labelId="demo-simple-select-label"
                            label="Select Locations"
                          //  value={data.Location.Name}
                          onChange={e=>console.log(JSON.parse(e.target.value))}
                            required
                            sx={{width:"50%"}}
                        >
                          {locations && locations.map(item=>{
                            return <MenuItem value={JSON.stringify({Name:item.name,Latitude:item.latitude,Longitude:item.longitude})}>{item.name}</MenuItem>
                          })}
                        </Select>
            {GoldenParameters &&
              GoldenParameters.map((item,itemIndex) => {
                return (
                  <div id={item.Parameter} >
                    <FormLabel
                      sx={{
                        mb: 1,
                        mt: 2,
                        color: "black",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {item.Parameter}
                    </FormLabel>{" "}
                    <br />
                    <FormGroup >
                      {item.Options.map((subItem,subItemIndex) => {
                        return (
                          
                            <FormControlLabel
                              control={<Checkbox name={item.Parameter} 
                              value={subItem} 
                              checked={checkBoxData.length && checkBoxData[itemIndex][subItemIndex].ischecked}
                              onChange={(e)=>{
                                selectOneCheckbox(e,itemIndex,subItemIndex)
                               }} />}
                              label={subItem}
                            />
                       
                        );
                      })}
                      </FormGroup>
                    
                  </div>
                );
              })}
               {AddOnsParameters &&
              AddOnsParameters.map((item,itemIndex) => {
                return (
                  <div id={item.Parameter} >
                    <FormLabel
                      sx={{
                        mb: 1,
                        mt: 2,
                        color: "black",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {item.Parameter}
                    </FormLabel>{" "}
                    <br />
                    <FormGroup >
                      {item.Options.map((subItem,subItemIndex) => {
                        return (
                          
                            <FormControlLabel
                              control={<Checkbox name={item.Parameter} 
                              value={subItem} 
                              checked={checkBoxData.length && checkBoxData[itemIndex+GoldenParameters.length][subItemIndex].ischecked}
                              onChange={(e)=>{
                                selectOneCheckbox(e,itemIndex+GoldenParameters.length,subItemIndex)
                               }} />}
                              label={subItem}
                            />
                       
                        );
                      })}
                      </FormGroup>
                    
                  </div>
                );
              })}
        </Grid>
        <Grid item xs={6} md={8} >
            <Typography variant="h4" sx={{mb:3,textAlign:"center"}}>{service} Services</Typography>
           <Form item={item} locations={locations}/>

          {filteredData && (filteredData.length ? <TableComponent data={filteredData}/>:
          <Typography variant="h5">No result found. Please try some different combination</Typography>)}
        </Grid>
       </Grid>}
       </div>
      <Footer/>
    </div>
  )
}

export default ServiceFilter