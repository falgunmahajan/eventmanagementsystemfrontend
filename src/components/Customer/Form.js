import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import React from 'react'

const Form = (props) => {
  return (
    <div>
      <form style={{border:"1px solid black", padding:20, marginBottom:10}}>
        <Grid container>
            <Grid item xs={12} md={10} sx={{m:"auto"}}>
      <InputLabel id="demo-simple-select-label" sx={{ mt: 2}}>Select Your Locations</InputLabel>
                    <Select
                           name="Services"
                            labelId="demo-simple-select-label"
                            label="Select Locations"
                          //  value={data.Location.Name}
                          onChange={e=>console.log(JSON.parse(e.target.value))}
                            required
                            fullWidth
                        >
                          {props.locations && props.locations.map(item=>{
                            return <MenuItem value={JSON.stringify({Name:item.name,Latitude:item.latitude,Longitude:item.longitude})}>{item.name}</MenuItem>
                          })}
                        </Select>
                        </Grid>
                        <Grid item xs={6} md={5} sx={{ml:"auto"}}>
                        <InputLabel id="demo-simple-select-label" sx={{ mt: 2}}>Enter Start Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker minDate={dayjs(new Date())} />
                        </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} md={5} sx={{mr:"auto"}}>
                        <InputLabel id="demo-simple-select-label" sx={{ mt: 2}}>Enter End Date</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker minDate={dayjs(new Date())}/>
                        </LocalizationProvider>
                        </Grid>
                        </Grid>
                        <Button variant="contained" type="button" size="large" sx={{ backgroundColor: "#d23838", '&:hover': { backgroundColor: "#d23838" }, m: 5, textTransform: "none", fontSize: 16 }}>Search</Button>
      </form>
    </div>
  )
}

export default Form
