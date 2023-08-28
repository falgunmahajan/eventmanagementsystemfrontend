
// import './App.css';

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import { ThemeProvider } from "@emotion/react";
import { theme } from "./Themes";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
   <Routes>
    <Route path="/" >
    <Route index element = {<Home/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/SignIn" element={<SignIn/>}/>
      </Route>
      <Route path="/serviceProvider">
      <Route index element ={<ServiceProviderDashboard/>}/> 
      </Route>
    <Route path="/admin">
      <Route index element ={<Admin/>}/>
         <Route path="dashboard" element={<Dashboard />}>
          <Route path="Services" element={<Services/>}/>
          <Route path="Customer" element={<Customer />}/>
          <Route path="ServiceProvider" element={<ServiceProvider />}/>
          <Route path="BookedCustomer" element={<BookedCustomer />}/>
          <Route path="AddServices" element={<AddServices/>}/>
          <Route path="AddParameters" element={<AddParameters/>}/>
          <Route path="AddOptions" element={<AddOptions/>}/>
          </Route>
    </Route>
    
   </Routes>
   </ThemeProvider>
  );
}

export default App;
