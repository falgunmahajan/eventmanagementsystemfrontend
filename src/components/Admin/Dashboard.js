import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import CardComponent from '../CardComponent'
import { Grid } from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import service from '../../Images/services.jpg'
import customers from "../../Images/customers.png"
import serviceProvider from "../../Images/serviceprovider.jpg"
import bookedService from "../../Images/bookservice.jpg"
import axios from 'axios'
export default function Dashboard() {
    const [services, setServices] = useState("")
    const [customer, setCustomer] = useState("")
    const [serviceprovider, setServiceProvider] = useState("")
    const [bookedCustomer, setbookedCustomer] = useState("")
    const [login,setLogin]=useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            let user;
            try {
                user = await axios.get("/api/validUser")
                console.log(user.data)
            }
            catch (err) {
                user = "";
            }
            if(!user)
            {
                navigate("/admin")
            }
            else{
                if(user.data.validUser.Role=="Admin")
                {
                    setLogin(true)
                const res1 = await axios.get("/api/getService")
                setServices(res1.data)
                const res2 = await axios.get("/api/getCustomer")
                setCustomer(res2.data)
                const res3 = await axios.get("/api/getServiceProvider")
                setServiceProvider(res3.data)
                const res4 = await axios.get("/api/getBookedCustomer")
                setbookedCustomer(res4.data)
                }
                else{
                    navigate("/admin")
                }
            }
                
                
            

        })();
    },[login])
    return (
        <div>
            <Navbar first="Services" second="Customer" third="ServiceProvider" fourth="BookedCustomer" path="/admin/dashboard/" Login={true} setLogin={setLogin}/>
            <Grid container spacing={1} sx={{ my: 4, minHeight: "70vh" }}>
                <Grid item sm={3} lg={2} sx={{ display: { xs: "none", sm: "block" }, mx: 5, borderRight: 1, borderColor: 'divider' }}>
                    <Link to="/admin/dashboard/Services" style={{ color: "black", fontSize: 17, textDecoration: "none" }}>Service Categories</Link><br /><br />
                    <Link to="/admin/dashboard/AddServices" style={{ color: "black", fontSize: 17, textDecoration: "none" }}>Add Services</Link><br /><br />
                    <Link to="/admin/dashboard/AddParameters" style={{ color: "black", fontSize: 17, textDecoration: "none" }}> Add Parameters</Link><br /><br />
                    <Link to="/admin/dashboard/AddOptions" style={{ color: "black", fontSize: 17, textDecoration: "none" }}>Add Options</Link><br /><br />
                    <Link to="/admin/dashboard/Customer" style={{ color: "black", fontSize: 17, textDecoration: "none" }}>View Customers</Link><br /><br />
                    <Link to="/admin/dashboard/ServiceProvider" style={{ color: "black", fontSize: 17, textDecoration: "none" }}>View ServiceProviders</Link><br /><br />
                    <Link to="/admin/dashboard/BookedCustomer" style={{ color: "black", fontSize: 17, textDecoration: "none" }}>View BookedCustomers</Link>
                </Grid>
                <Grid item xs={7} sm={7} lg={9} sx={{ mx: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={2} sx={{ mx: "auto" }}>
                            <CardComponent width={200} imgSrc={service} title="Services" length={services.length} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2} sx={{ mx: "auto" }}>
                            <CardComponent width={200} imgSrc={customers} title="Customers" length={customer.length} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2} sx={{ mx: "auto" }}>
                            <CardComponent width={200} imgSrc={serviceProvider} title="Service Provider" length={serviceprovider.length} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2} sx={{ mx: "auto" }}>
                            <CardComponent width={200} imgSrc={bookedService} title="Book Service" length={bookedCustomer.length} />
                        </Grid>
                        <Grid item xs={12} sx={{ mx: "auto", mb: 3 }}>
                            <Outlet />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Footer />



        </div>
    )
}
