import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react'
import image from "../Images/footerBackground.jpeg"
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

// const navItems = ['Home', 'About', 'Contact'];
const Navbar = (props) => {
  const navigate=useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

      <Divider />
      <List>
        {Object.keys(props).map((item) => (
          
            (item!=="path") && <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={props[item]} />
              </ListItemButton>
            </ListItem>
        )


        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position='static'>
        <Toolbar sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover", padding: "20px"
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            onClick={()=>navigate(`${props.path}`)}
            sx={{ flexGrow: 1, display: { xs: 'block' }, mx: { sm: 5 }, fontWeight: "bold",cursor:"pointer" }}
          >
            EventEase
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {Object.keys(props).map((item) => (
              (props[item]=="Home")? <Button key={item}  sx={{ color: '#fff' }} onClick={()=>navigate(`${props.path}`)}>
              {props[item]}
            </Button>:
                (item!=="path") && 
               <Button key={item}  sx={{ color: '#fff' }} onClick={()=>navigate(`${props.path}${(props[item])}`)}>
                 {props[item]}
               </Button>
            )
              
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  );

}

export default Navbar




