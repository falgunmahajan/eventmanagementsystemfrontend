import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Grid } from "@mui/material";
import CardComponent from "../CardComponent";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { baseUrl } from "../../baseUrl";
const ServiceProviderDashboard = () => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(true)
  const [services, setServices] = useState("");
  const [login,setLogin]=useState(false)
  useEffect(() => {
    (async () => {
      let user;
      let token=localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")).token
      try {
          user = await axios.get(`${baseUrl}/api/validUser/${token}`)
     
        console.log(user.data);
      } catch (err) {
        user = "";
      }
      if (!user) {
        navigate("/");
      } else {
        if (user.data.validUser.Role == "Service Provider") {
          setLogin(true)
          const res1 = await axios.get(`${baseUrl}/api/getService`);
          console.log(res1);
          setServices(res1.data);
          setLoading(false)
        }
        else{
          navigate("/");
        }
      }
    })();
  }, [login]);
  return (
    <div>
      <Navbar
        first="Home"
        second="ViewBooking"
        third="ServicesAdded"
        path="/serviceProvider/"
        Login={true}
        setLogin={setLogin}
      />
       <div style={{textAlign:"center",marginTop:100}}>
       <ClipLoader  loading={loading} />
       </div>
      <Grid
        container
        sx={{
          minHeight: "75vh",
          margin: "auto",
          px: 3,
          my: 8,
          display: "flex",
          alignItems: "center",
        }}
      >
        {services &&
          services.map((item) => {
            return (
              <Grid item xs={12} sm={6} lg={3} sx={{px:{xs:0,sm:5}}}>
                <CardComponent
                  width={300}
                  imgSrc={`${baseUrl}/${item.ImageUrl}`}
                  title={item.Service}
                  path="/serviceProvider/services"
                />
              </Grid>
            );
          })}
      </Grid>
      <Footer />
    </div>
  );
};

export default ServiceProviderDashboard;
