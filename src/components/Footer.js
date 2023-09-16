import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import image from "../Images/footerBackground.jpeg"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover", padding: "20px"
                }}>

                    <Grid container >
                        <Grid item xs={12} md={4} sx={{ mx: 'auto' }}>
                            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>Event Management</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ mx: 'auto' }}>
                            <Typography sx={{ fontSize: 24, fontWeight: "bold", mb: 0.25 }}>Contact</Typography>
                            <Box sx={{ mb: 0.25 }}>
                                <MailOutlineIcon sx={{ mr: 1 }} />
                                eventease@event.com
                            </Box>
                            <Box>
                                <PhoneIcon sx={{ mr: 1 }} />
                                011-9932-4354
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography  component="div" sx={{borderTop:"2px solid white", mt:2, pt:2, textAlign:"center"}}>Copyright<CopyrightIcon sx={{mx:0.25}}/>event 2023. All right reserved
                        </Typography>
                        </Grid>
                    </Grid>
            

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Footer
