import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import image from "../../Images/footerBackground.jpeg";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Footer from "../Footer";
import Navbar from "../Navbar";
const ParameterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [GoldenParameters, setGoldenParameters] = useState("");
  const [AddOnsParameters, setAddOnsParameters] = useState("");
  const [loading, setLoading] = useState(true);
  const [locations,setLocations]=useState()
  const [checkBoxData,setCheckBoxdata]=useState([])
  const [data,setData]=useState({
    Service:"",
    ServiceProviderName:"",
    ServiceProvidedBy:"",
    Location:"",
    GoldenParameters:{},
    AddOnsParameters:[]
  })
  const navigate=useNavigate("")
  const ref=useRef()
  let service = searchParams.get("service");
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
        setData({...data,Service:service,ServiceProviderName:userData.Name,ServiceProvidedBy:userData._id})
      } catch (err) {
        user = "";
      }
      if (!user) {
        navigate("/");
      } else {
        if (user.data.validUser.Role == "Service Provider") {
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
        return {ischecked:false}
        })
       })
       const AddOnsArray=AddOnsParameter && AddOnsParameter.map(item=>{
        return item.Options.map(subItem=>{
        return {ischecked:false}
        })
       })
       const initialState=[...GoldenArray,...AddOnsArray]
       console.log(initialState)
    setCheckBoxdata([...initialState])
        }
      else{
        navigate("/");
      }}
    })();
  }, []);
  console.log(GoldenParameters, AddOnsParameters);
  console.log(checkBoxData)
 const selectOneCheckbox=(divIndex,checkBoxIndex)=>
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
          console.log("something")
          return{
            ...checkbox,
            ischecked:true
          };
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
 }
 const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(data)
 }
  return (
    <div>
     
      <Navbar first="Home" second="ViewBooking" third="ServicesAdded" />
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <ClipLoader loading={loading} />
      </div>
      <div style={{minHeight:"70vh"}}>
      {!loading &&<Grid container spacing={2}>
        <Grid
          item
          xs={8}
          md={4}
          sx={{
            mx: "auto",
            my: 10,
            pb: 2,
            pr: 2,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
          }}
        >
          {/* {error && (
            <Alert severity="error" sx={{ fontSize: 16, fontWeight: "bold" }}>
              {error}
            </Alert>
          )} */}
          <form onSubmit={handleSubmit} className="bg-white p-4 w-100 my-2">
            <Typography
              variant="h4"
              component="div"
              sx={{ textAlign: "center", mb: 2 }}
            >
              Parameter Form
            </Typography>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Select Locations</InputLabel>
                    <Select
                           name="Services"
                            labelId="demo-simple-select-label"
                            label="Select Locations"
                          //  value={data.Location.Name}
                            fullWidth
                            required
                            onChange={(e)=>setData({...data,Location:e.target.value})}
                        >
                          {locations &&locations.map(item=>{
                            return <MenuItem value={{Name:item.name,Latitude:item.latitude,Longitude:item.longitude}}>{item.name}</MenuItem>
                          })}
                        </Select>
                        <TextField id="outlined-basic" label="Price Per Km" variant="outlined" fullWidth required sx={{mt:2}}/>
            {GoldenParameters &&
              GoldenParameters.map((item,itemIndex) => {
                return (
                  <div id={item.Parameter}  >
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
                    <Grid container>
                      {item.Options.map((subItem,subItemIndex) => {
                        return (
                          <Grid item xs={12} lg={6}>
                            <FormControlLabel
                              control={<Checkbox name={item.Parameter} 
                              value={subItem} 
                              checked={checkBoxData.length && checkBoxData[itemIndex][subItemIndex].ischecked}
                              onChange={(e)=>{
                                selectOneCheckbox(itemIndex,subItemIndex)
                                const parameters={...data.GoldenParameters,[e.target.name]:e.target.value}
                              setData({...data,GoldenParameters:parameters})}} />}
                              label={subItem}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                );
              })}
              <TextField id="outlined-basic" label="Price" name="Price" variant="outlined" fullWidth required onChange={(e)=>{
                 const parameters={...data.GoldenParameters,[e.target.name]:e.target.value}
                 setData({...data,GoldenParameters:parameters})}}
               sx={{mt:2}} />
                   {AddOnsParameters &&
              AddOnsParameters.map((item,itemIndex) => {
                return (
                  <div id={item.Parameter}  >
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
                    <Grid container>
                      {item.Options.map((subItem,subItemIndex) => {
                        return (
                          <Grid item xs={12} lg={6}>
                            <FormControlLabel
                              control={<Checkbox
                                 value={subItem} 
                                 name={item.Parameter} 
                                 checked={checkBoxData.length && checkBoxData[itemIndex+GoldenParameters.length][subItemIndex].ischecked}
                                 onChange={(e)=>{
                                  selectOneCheckbox(itemIndex+GoldenParameters.length,subItemIndex)
                                  const parameter={...data.AddOnsParameters[e.target.name],value:e.target.value};
                                const parameterObject=[...data.AddOnsParameters,{[e.target.name]:parameter}];
                               setData({...data,AddOnsParameters:parameterObject})}}/>}
                              label={subItem}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                    <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth required 
                    name={`${item.Parameter} price`}
                    onChange={(e)=>{
                      const parameter={...data.AddOnsParameters[itemIndex][item.Parameter],[e.target.name]:e.target.value};
                      console.log(data.AddOnsParameters[itemIndex][item.Parameter]);
                               const parameterObject=[...data.AddOnsParameters.slice(0,itemIndex),{[item.Parameter]:parameter},...data.AddOnsParameters.slice(itemIndex+1)]
                               setData({...data,AddOnsParameters:parameterObject})
                    }}
                    sx={{mt:2}}/>
                  </div>
                );
              })}
              <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: "#d23838", '&:hover':{backgroundColor: "#d23838" }, mb: 3, mt:6, textTransform: "none", fontSize: 16 }}>Submit</Button>
          </form>
        </Grid>
      </Grid>}
      </div>
      <Footer />
    </div>
  );
};

export default ParameterForm;
