import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import image from "../Images/background.jpg"
import { Grid, Typography } from '@mui/material';
import CardComponent from './CardComponent';
import Footer from './Footer';
import { ClipLoader } from 'react-spinners';
const Home = () => {
  const [login, setLogin] = useState(false);
  const [services, setServices] = useState("");
  const[loading,setLoading]=useState(true)
  const path=login?"/customers/services":"/SignIn"
  useEffect(() => {
    (async () => {
      const res1 = await axios.get("/api/getService")
      console.log(res1)
      setServices(res1.data)
      setLoading(false)
      let user;
            try {
                user = await axios.get("/api/validUser")
                console.log(user.data)
            }
            catch (err) {
                user = "";
            }

            if (!user) {
               setLogin(false)
            }
            else{
              if(user.data.validUser.Role=="Customer")
              {
                setLogin(true)
              }
             
            }
    })();
  }, [])


  return (
    <div>

      {!login &&
        <Navbar first="Home" fourth="SignUp" fifth="SignIn" path="/" />
      }
      {login &&
        <Navbar first="Home"  fourth="ViewBooking" path="/" />
      }
      <div className="d-flex align-items-center justify-content-center text-white flex-column" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", height: '70vh' }}>
        <Typography variant="h2">Welcome to Event Management</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>Find the Perfect Services For Your Special Occasions</Typography>
      </div>
      <div id="Service" style={{ marginTop: 50 }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>Service Categories</Typography>
        <div style={{textAlign:"center",marginTop:30}}>
       <ClipLoader  loading={loading} />
       </div> 
        <Grid container sx={{ ml:"auto", px: 3, mt: 4 }}>
       
          {services && services.map(item => {
            return <Grid item xs={6} md={3} sx={{px:10}}>
              <CardComponent width={300} imgSrc={`http://localhost:8080/${item.ImageUrl}`} title={item.Service} path={path}  />
            </Grid>
          })}

        </Grid>
        <div id="About" style={{ marginTop: 40 }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>About us</Typography></div>
        <div className="mx-5 px-5 w-100, mt-3 mb-5">
          <Typography sx={{ fontSize: 21,mx:6 }}>In a world where events hold immense significance in both personal and professional realms, the process of planning and booking services can often be overwhelming.</Typography>
          <Typography sx={{ fontSize: 21,mx:6 , mt: 2 }}>Event Management is a comprehensive platform aims to bridge this gap by offering a streamlined ecosystem that connects customers seeking event services with reliable and skilled service providers.</Typography>
          <Typography sx={{ fontSize: 21,mx:6 , mt: 2 }}>For customers, we provide a one-stop destination to discover and book, a wide range of services related to events like weddings, college farewells, birthdays, and conference meetings.</Typography>
          <Typography sx={{ fontSize: 21,mx:6 , mt: 2,mb:20 }}>On the other side, service providers have the opportunity to showcase their offerings to a diverse customer base. Through our platform, providers can efficiently add their services and view customer booking.</Typography>
        </div>

      </div>


      <Footer />
    </div>
  )
}

export default Home
