import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Grid } from "@mui/material";
import CardComponent from "../CardComponent";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
const ServiceProviderDashboard = () => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(true)
  const [services, setServices] = useState("");
  useEffect(() => {
    (async () => {
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
        if (user.data.validUser.Role == "Service Provider") {
          const res1 = await axios.get("/api/getService");
          console.log(res1);
          setServices(res1.data);
          setLoading(false)
        }
        else{
          navigate("/");
        }
      }
    })();
  }, []);
  return (
    <div>
      <Navbar
        first="Home"
        second="ViewBooking"
        third="ServicesAdded"
        path="/serviceProvider/"
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
              <Grid item xs={6} md={3} sx={{ px: 10 }}>
                <CardComponent
                  width={300}
                  imgSrc={`http://localhost:8080/${item.ImageUrl}`}
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