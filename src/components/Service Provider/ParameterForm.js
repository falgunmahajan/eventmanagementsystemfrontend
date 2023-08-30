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
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Footer from "../Footer";
import Navbar from "../Navbar";
const ParameterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [GoldenParameters, setGoldenParameters] = useState("");
  const [AddOnsParameters, setAddOnsParameters] = useState("");
  const [loading, setLoading] = useState(true);
  const [locations,setLocations]=useState()
  let service = searchParams.get("service");
  console.log(service);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/getServiceOptions?service=${service}`);
      setGoldenParameters(res.data.GoldenParameter);
      setAddOnsParameters(res.data.AddOnsParameter);
      setLoading(false);
      const response = await axios.get("/api/getLocations")
      setLocations(response.data)
      console.log(response.data)
    
    })();
  }, []);
  console.log(GoldenParameters, AddOnsParameters);
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
          <form className="bg-white p-4 w-100 my-2">
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
                        //    value={options.Services}
                            fullWidth
                            required
                            onChange={(e)=>console.log(e.target.value)}
                        >
                          {locations &&locations.map(item=>{
                            return <MenuItem value={{Name:item.name,Latitude:item.latitude,Longitude:item.longitude}}>{item.name}</MenuItem>
                          })}
                        </Select>
                        <TextField id="outlined-basic" label="Price Per Km" variant="outlined" fullWidth required sx={{mt:2}}/>
            {GoldenParameters &&
              GoldenParameters.map((item) => {
                return (
                  <div>
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
                      {item.Options.map((subItem) => {
                        return (
                          <Grid item xs={12} lg={6}>
                            <FormControlLabel
                              control={<Checkbox />}
                              label={subItem}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                );
              })}
              <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth required sx={{mt:2}} />
                   {AddOnsParameters &&
              AddOnsParameters.map((item) => {
                return (
                  <div>
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
                      {item.Options.map((subItem) => {
                        return (
                          <Grid item xs={12} lg={6}>
                            <FormControlLabel
                              control={<Checkbox />}
                              label={subItem}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                    <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth required sx={{mt:2}}/>
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
