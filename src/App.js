// import './App.css';

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

// import { ThemeProvider } from "@emotion/react";
// import { theme } from "./Themes";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard";
import Services from "./components/Admin/Services";
import Customer from "./components/Admin/Customer";
import ServiceProvider from "./components/Admin/ServiceProvider";
import BookedCustomer from "./components/Admin/BookedCustomer";
import AddServices from "./components/Admin/AddServices";
import AddParameters from "./components/Admin/AddParameters";
import AddOptions from "./components/Admin/AddOptions";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ServiceProviderDashboard from "./components/Service Provider/ServiceProviderDashboard";
import ParameterForm from "./components/Service Provider/ParameterForm";
import ServiceAdded from "./components/Service Provider/ServiceAdded";
import ServiceFilter from "./components/Customer/ServiceFilter";
import { useEffect, useState } from "react";
import Booking from "./components/Customer/Booking";
import ViewBooking from "./components/Customer/ViewBooking";
import Details from "./components/Details";
import ServiceProviderViewBooking from "./components/Service Provider/ServiceProviderViewBooking";


function App() {
  return (
    // <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Route>
      <Route path="/serviceProvider">
        <Route index element={<ServiceProviderDashboard />} />
        <Route path="services" element={<ParameterForm />} />
        <Route path="ServicesAdded" element={<ServiceAdded />} />
        <Route path="ViewBooking" >
        <Route index element={<ServiceProviderViewBooking />}/>
        <Route path="details" element={<Details  role="Service Provider"/>}/>
        </Route>
      </Route>
      <Route path="/customers">
        <Route
          path="services"
          element={
            <ServiceFilter/>
          }
        />
      </Route>
      <Route
            path="customers/services/booking"
            element={
              <Booking />
            }
          />
           <Route path="viewBooking">
            <Route index element={<ViewBooking />}/>
            <Route path="details" element={<Details role="Customer" />}/>
           </Route>
      <Route path="/admin">
        <Route index element={<Admin />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="Services" element={<Services />} />
          <Route path="Customer" element={<Customer />} />
          <Route path="ServiceProvider" element={<ServiceProvider />} />
          <Route path="BookedCustomer" element={<BookedCustomer />} />
          <Route path="AddServices" element={<AddServices />} />
          <Route path="AddParameters" element={<AddParameters />} />
          <Route path="AddOptions" element={<AddOptions />} />
        </Route>
      </Route>
      
    </Routes>
    //  </ThemeProvider>
  );
}

export default App;
