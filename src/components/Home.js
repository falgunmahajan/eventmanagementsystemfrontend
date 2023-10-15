import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import image from "../Images/background.jpg"
import { Grid, Typography } from '@mui/material';
import CardComponent from './CardComponent';
import Footer from './Footer';
import { ClipLoader } from 'react-spinners';
import { baseUrl } from '../baseUrl';
const Home = () => {
  const [login, setLogin] = useState(false);
  const [services, setServices] = useState("");
  const[loading,setLoading]=useState(true)
  const path=login?"/customers/services":"/SignIn"
  useEffect(() => {
    (async () => {
      const res1 = await axios.get(`${baseUrl}/api/getService`)
      console.log(res1)
      setServices(res1.data)
      setLoading(false)
      let user;
      let token=localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")).token
      try {
          user = await axios.get(`${baseUrl}/api/validUser/${token}`)
           
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
  }, [login])


  return (
    <div>

      {!login &&
        <Navbar first="Home" fourth="SignUp" fifth="SignIn" path="/" />
      }
      {login &&
        <Navbar first="Home"  second="ViewBooking" path="/" Login={true} setLogin={setLogin}/>
      }
      <div className="d-flex align-items-center justify-content-center text-white flex-column" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", height: '70vh' }}>
        <Typography variant="h2" sx={{ typography: { md: 'h2', xs: 'h5' } }}>Welcome to Event Management</Typography>
        <Typography variant="h5" sx={{typography: { sm: 'h5', xs: 'body2' }, mt: 2 }}>Find the Perfect Services For Your Special Occasions</Typography>
      </div>
      <div id="Service" style={{ marginTop: 50 }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>Service Categories</Typography>
        <div style={{textAlign:"center",marginTop:30}}>
       <ClipLoader  loading={loading} />
       </div> 
        <Grid container sx={{ ml:"auto", px: 3, mt: 4 }}>
       
          {services && services.map(item => {
            return <Grid item xs={12} sm={6} lg={3} sx={{px:{xs:0,sm:5}}}>
              <CardComponent width={300} imgSrc={`${baseUrl}/${item.ImageUrl}`} title={item.Service} path={path}  />
            </Grid>
          })}

        </Grid>
        <div id="About" style={{ marginTop: 40 }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>About us</Typography></div>
        <div className="mx-5 px-5 w-100, mt-3 mb-5">
          <Typography sx={{ fontSize:{xs:18,sm:21},mx:{xs:0,sm:6 }}}>In a world where events hold immense significance in both personal and professional realms, the process of planning and booking services can often be overwhelming.</Typography>
          <Typography sx={{ fontSize:{xs:18,sm:21},mx:{xs:0,sm:6 }, mt:2}}>Event Management is a comprehensive platform aims to bridge this gap by offering a streamlined ecosystem that connects customers seeking event services with reliable and skilled service providers.</Typography>
          <Typography sx={{ fontSize:{xs:18,sm:21},mx:{xs:0,sm:6 },mt:2}}>For customers, we provide a one-stop destination to discover and book, a wide range of services related to events like weddings, college farewells, birthdays, and conference meetings.</Typography>
          <Typography sx={{ fontSize:{xs:18,sm:21},mx:{xs:0,sm:6 },mt:2,mb:20}}>On the other side, service providers have the opportunity to showcase their offerings to a diverse customer base. Through our platform, providers can efficiently add their services and view customer booking.</Typography>
        </div>

      </div>
      <div id="About" style={{ marginTop: 40 , marginBottom:40}}>
      <iframe style={{background: "#F1F5F4",border: "none",borderRadius: "2px",boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",width: "100vw",height: "100vh"}} src="https://charts.mongodb.com/charts-event-based-services-book-efbvz/embed/dashboards?id=c0f84884-c5c3-4551-80ac-7aaa6485a616&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
      </div>
      <Footer />
    </div>
  )
}

export default Home
