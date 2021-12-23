import React from "react";
import { Home as HomeIcon, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                CPF CRUD
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={open} onClose={closeDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
