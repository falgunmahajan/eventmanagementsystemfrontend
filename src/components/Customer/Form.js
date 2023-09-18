import {
  Alert,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";

const Form = (props) => {
 
  const [diffDays, setDiffDays] = useState();
  const [error, setError] = useState(false);
  
  useEffect(() => {
    calculateDateDifference();
    handleSubmit()
  }, [props.formData["Start Date"], props.formData["End Date"],props.formData.Location]);
  const title =
    props.service == "Invitation Card" ? "Number Of Cards" : "Number of People";
  const getDate = (value) => {
    let today,min;
    if(value)
    {
      today = new Date(value);
      min = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(
       -2
     )}-${`0${today.getDate()}`.slice(-2)}`;
    }
    else{
       today = new Date();
       min = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(
        -2
      )}-${`0${today.getDate() + 3}`.slice(-2)}`;
    }
  
    return min;
  };
  const handleChange = (name, value) => {
    console.log(name, value);
    props.setFormData({ ...props.formData, [name]: value });
    console.log(props.formData);
  };
  const calculateDateDifference = () => {
    if (props.formData["End Date"] && props.formData["Start Date"]) {
      console.log("some");
      console.log(new Date(props.formData["End Date"]));
      const diff =
        new Date(props.formData["End Date"]) - new Date(props.formData["Start Date"]);
      const diffTime = Math.ceil(diff / (1000 * 60 * 60 * 24));
      console.log(diffDays);
      setDiffDays(diffTime);
      if (diffTime < 0) {
        setError("End Date cannot be less than start date");
      } else {
      setError(false);
      }
    }
  };
  const calculateDistance = (customerCoordinates, serviceProviderCoordinates) => {
    return Math.trunc(
      getDistance(customerCoordinates, serviceProviderCoordinates) / 1000
    );
  };
  const handleSubmit = () => {
    const isFilled = Object.values(props.formData).every((value) => value !== "");
    console.log(isFilled);
    console.log(props.formData.Location.Latitude,props.formData.Location.Longitude)
    console.log(error)
    if (isFilled && !error) {
      if (props.filteredData) {
        props.setMsg(false);
        
        const data = props.filteredData.map((obj,index) => {
          console.log(obj.Location.value.Latitude,obj.Location.value.Longitude)
          let total=Number(obj.GoldenParameters.Price)
          let dist=calculateDistance({latitude:props.formData.Location.Latitude,longitude:props.formData.Location.Longitude},{latitude:obj.Location.value.Latitude,longitude:obj.Location.value.Longitude})
          console.log(dist)
          if(obj.AddOnsParameter)
          {
            Object.keys(obj.AddOnsParameter).map(item=>{
             total+=Number(obj.AddOnsParameter[item].price)
            })
          }
         if( props.service == "Invitation Card" ||
    props.service == "Mehndi Artist" ||
    props.service == "Catering")
    {
      total=total*Number(props.formData.Quantity)
    }
    total=total*(diffDays+1)+dist*obj.Location.price
        return ( {
          ...obj,
          'Total Price': total,
          Action: index,
        })});
        props.setFilteredData(data);
      } else {
        props.setMsg("Please Select Filters to Proceed");
      }
    }
  };
  return (
    <div>
      <form
        style={{ border: "1px solid black", padding: 20, marginBottom: 10 }}
      >
        {error && (
          <Grid item xs={12} md={10} sx={{ m: "auto" }}>
            <Alert severity="error" sx={{ fontSize: 16, fontWeight: "bold" }}>
              {error}
            </Alert>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={12} md={10} sx={{ m: "auto" }}>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>
              Select Your Locations
            </InputLabel>
            <Select
              name="Location"
              labelId="demo-simple-select-label"
              label="Select Locations"
              //  value={data.Location.Name}
              onChange={(e) => handleChange(e.target.name, JSON.parse(e.target.value))}
              required
              fullWidth
            >
              {props.locations &&
                props.locations.map((item) => {
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
          </Grid>
          {(props.service == "Invitation Card" ||
            props.service == "Mehndi Artist" ||
            props.service == "Catering") && (
            <Grid item xs={12} md={10} sx={{ m: "auto" }}>
              <TextField
                type="number"
                id="outlined-basic"
                label={title}
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 4 }}
                name="Quantity"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={6} md={5} sx={{ ml: "auto" }}>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>
              Enter Start Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={dayjs(getDate())}
                onChange={(value) => handleChange("Start Date", getDate(value))}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={5} sx={{ mr: "auto" }}>
            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>
              Enter End Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="end date"
                minDate={dayjs(getDate())}
                onChange={(value) => handleChange("End Date", getDate(value))}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="button"
          size="large"
          sx={{
            backgroundColor: "#d23838",
            "&:hover": { backgroundColor: "#d23838" },
            m: 5,
            textTransform: "none",
            fontSize: 16,
          }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Form;
