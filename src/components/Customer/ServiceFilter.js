import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
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
  Typography,
} from "@mui/material";
import axios from "axios";
import TableComponent from "../TableComponent";
import Form from "./Form";
import { cloneDeep } from "lodash";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { baseUrl } from "../../baseUrl";
const ServiceFilter = () => {
  const [bookedData, setBookedData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const service = searchParams.get("service");
  const [GoldenParameters, setGoldenParameters] = useState("");
  const [AddOnsParameters, setAddOnsParameters] = useState("");

  const [locations, setLocations] = useState();
  const [checkBoxData, setCheckBoxdata] = useState([]);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

  const [item, setItems] = useState();
  const [msg, setMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMsg,setErrMsg]=useState("")
   const handleClose = () => {
     setOpen(false);
   };
  
  // const [success,setSuccess]=useState(false)
  // const [initial,setInitial]=useState()
  const object =
    service == "Invitation Card" ||
    service == "Mehndi Artist" ||
    service == "Catering"
      ? {
          Location: "",
          "Start Date": "",
          "End Date": "",
          Quantity: "",
        }
      : {
          Location: "",
          "Start Date": "",
          "End Date": "",
        };
  const [formData, setFormData] = useState(object);
  const navigate = useNavigate("");

  console.log(service);
  useEffect(() => {
    (async () => {
      let user;
      let token=localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")).token
      try {
          user = await axios.get(`${baseUrl}/api/validUser/${token}`)
        console.log(user.data);
        console.log(service);
        // const userData = user.data.validUser;
        // console.log(userData);
      } catch (err) {
        user = "";
      }
      if (!user) {
        navigate("/");
      } else {
        if (user.data.validUser.Role == "Customer") {
          setLogin(true)
          console.log(user.data.validUser);
          setBookedData({
            ...bookedData,
            Service: service,
            CustomerName: user.data.validUser.Name,
            CustomerId: user.data.validUser._id,
            CustomerContact:user.data.validUser.Contact,
          });
          const res = await axios.get(
            `${baseUrl}/api/getServiceOptions?service=${service}`
          );
          const { GoldenParameter, AddOnsParameter } = res.data;
          console.log(GoldenParameter, AddOnsParameter);
          setGoldenParameters(GoldenParameter);
          setAddOnsParameters(AddOnsParameter);
          setLoading(false);
          const response = await axios.get(`${baseUrl}/api/getLocations`);
          setLocations(response.data);
          console.log(response.data);
          const GoldenArray =
            GoldenParameter &&
            GoldenParameter.map((item) => {
              return item.Options.map((subItem) => {
                return {
                  ischecked: false,
                  value: subItem,
                  name: item.Parameter,
                  type: "GoldenParameter",
                };
              });
            });
          const AddOnsArray =
            AddOnsParameter &&
            AddOnsParameter.map((item) => {
              return item.Options.map((subItem) => {
                return {
                  ischecked: false,
                  value: subItem,
                  name: item.Parameter,
                  type: "AddOnsParameter",
                };
              });
            });
          const initialState = [...GoldenArray, ...AddOnsArray];
          console.log(initialState);
          setCheckBoxdata([...initialState]);
          //   setInitial([...initialState])
          const resp = await axios.get(
            `${baseUrl}/api/getServiceData?service=${service}`
          );
          const requiredResp = resp.data.map((item) => {
            delete item._id;
            delete item.__v;
            delete item.Service;
            // delete item.ServiceAddedBy;
            // delete item.Location.price;
            return item;
          });
          setData(requiredResp);
        } else {
          navigate("/");
        }
      }
    })();
  }, [login]);
  const [serviceProviderLocation, setServiceProviderLocation] = useState("");
  useEffect(() => {
    if (checkBoxData.length) {
      getFilter(checkBoxData);
    }
  }, [serviceProviderLocation]);
  useEffect(()=>{
    if(bookedData)
    {
      localStorage.setItem("bookedData",JSON.stringify(bookedData))
    }
    
  },[bookedData])
  console.log(GoldenParameters, AddOnsParameters);
  console.log(checkBoxData);
  const selectOneCheckbox = (e, divIndex, checkBoxIndex) => {
    console.log(divIndex, checkBoxIndex);
    console.log(checkBoxData[0]);
    const updatedCheckboxData = checkBoxData.map((div, index) => {
      console.log("index", index);
      if (index == divIndex) {
        return div.map((checkbox, ind) => {
          console.log(ind);
          if (ind == checkBoxIndex) {
            if (e.target.checked) {
              return {
                ...checkbox,
                ischecked: true,
              };
            }
          }
          return {
            ...checkbox,
            ischecked: false,
          };
        });
      }
      return div;
    });

    setCheckBoxdata(updatedCheckboxData);
    setMsg(false);
    getFilter(updatedCheckboxData);
  };
  const getFilter = (checkBoxData) => {
    console.log(checkBoxData);
    const filter = checkBoxData.map((item) => {
      return item.filter((subItem) => {
        if (subItem.ischecked) {
          return subItem;
        }
      });
    });
    console.log(data);
    console.log(filter);
    const filteredarray = [].concat(...filter);
    if (serviceProviderLocation) {
      filteredarray.push({
        name: "Location",
        value: JSON.parse(serviceProviderLocation),
      });
    }
    console.log(filteredarray);
    const filterData = data
      .filter((item) => {
        console.log(item);
        return filteredarray.every((filter) => {
          if (!filter.type) {
            console.log(item.Location.value, filter.value.Name);
            return item.Location.value.Name == filter.value.Name;
          }
          if (filter.type == "GoldenParameter") {
            return item.GoldenParameters[filter.name] == filter.value;
          }
          if (filter.type == "AddOnsParameter") {
            return item.AddOnsParameter[filter.name].value == filter.value;
          }
        });
      })
      .map((item) => cloneDeep(item));
    console.log(filterData);
    const keys = {};
    filterData.map((item) => {
      if (item.AddOnsParameter) {
        Object.keys(item.AddOnsParameter).map((key) => {
          keys[key] = false;
          filteredarray.map((subitem) => {
            if (subitem.name === key) {
              keys[key] = true;
            }
          });
        });
      }
    });
    console.log(keys);
    let finalData = filterData.map((item) => cloneDeep(item));
    console.log(finalData);
    Object.keys(keys).map((subkey) => {
      if (!keys[subkey]) {
        finalData = finalData.map(
          ({ AddOnsParameter: { [subkey]: _, ...rest }, ...obj }) => ({
            ...obj,
            AddOnsParameter: rest,
          })
        );
      }
    });
    console.log(finalData);
    setFilteredData(finalData);
  };
  const getBookedService = async(index) => {
      console.log(filteredData[index]);
      setBookedData({...bookedData,...filteredData[index],...formData})
     
      try {
        const res=await axios.get(`${baseUrl}/api/availableDates?service=${bookedData.Service}&serviceProviderId=${filteredData[index].ServiceAddedBy}&start=${formData['Start Date']}&end=${formData['End Date']}`)
      
        navigate("/customers/services/booking")
      } catch (error) {
        setErrMsg(error.response.data.message)
       setOpen(true)
      }
   
      
      
      
  };
  return (
    <div>
      <Navbar first="Home" second="ViewBooking" path="/" Login={true} setLogin={setLogin} />
      {loading && (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <ClipLoader loading={loading} />
        </div>
      )}
      <div style={{ minHeight: "75vh" }}>
        {!loading && (
          <Grid container spacing={2} sx={{ minHeight: "75vh", my: 4, pl: 10 }}>
            <Grid item xs={6} md={3} sx={{ px: "10px" }}>
              <Typography variant="h4">Filters</Typography>
              <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>
                Service Provider Locations
              </InputLabel>
              <Select
                name="Services"
                labelId="demo-simple-select-label"
                label="Service Provider Locations"
                displayEmpty
                value={serviceProviderLocation}
                onChange={(e) => setServiceProviderLocation(e.target.value)}
                required
                sx={{ width: "50%" }}
              >
                <MenuItem value="">Select</MenuItem>
                {locations &&
                  locations.map((item) => {
                    return (
                      <MenuItem
                        value={JSON.stringify({
                          Name: item.name,
                          Latitude: item.latitude,
                          Longitude: item.longitude,
                        })}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              {GoldenParameters &&
                GoldenParameters.map((item, itemIndex) => {
                  return (
                    <div id={item.Parameter}>
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
                      <FormGroup>
                        {item.Options.map((subItem, subItemIndex) => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={item.Parameter}
                                  value={subItem}
                                  checked={
                                    checkBoxData.length &&
                                    checkBoxData[itemIndex][subItemIndex]
                                      .ischecked
                                  }
                                  onChange={(e) => {
                                    selectOneCheckbox(
                                      e,
                                      itemIndex,
                                      subItemIndex
                                    );
                                  }}
                                />
                              }
                              label={subItem}
                            />
                          );
                        })}
                      </FormGroup>
                    </div>
                  );
                })}
              {AddOnsParameters &&
                AddOnsParameters.map((item, itemIndex) => {
                  return (
                    <div id={item.Parameter}>
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
                      <FormGroup>
                        {item.Options.map((subItem, subItemIndex) => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={item.Parameter}
                                  value={subItem}
                                  checked={
                                    checkBoxData.length &&
                                    checkBoxData[
                                      itemIndex + GoldenParameters.length
                                    ][subItemIndex].ischecked
                                  }
                                  onChange={(e) => {
                                    selectOneCheckbox(
                                      e,
                                      itemIndex + GoldenParameters.length,
                                      subItemIndex
                                    );
                                  }}
                                />
                              }
                              label={subItem}
                            />
                          );
                        })}
                      </FormGroup>
                    </div>
                  );
                })}
            </Grid>
            <Grid item xs={6} md={8}>
              <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
                {service} Services
              </Typography>
              <Form
                item={item}
                setMsg={setMsg}
                locations={locations}
                service={service}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
              
                formData={formData}
                setFormData={setFormData}
              />

              {filteredData &&
                (filteredData.length ? (
                  <TableComponent
                    data={filteredData}
                    getBookedService={getBookedService}
                  />
                ) : (
                  <Typography variant="h5">
                    No result found. Please try some different combination
                  </Typography>
                ))}
              {msg && (
                <Alert
                  icon={false}
                  severity="info"
                  sx={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {msg}
                </Alert>
              )}
            </Grid>
          </Grid>
        )}
         <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {errMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceFilter;
