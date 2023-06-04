import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from "./FlexBetween";
import profileImage from "assets/images.jpeg";

const navItems =[ // Creates list of objectsto be used within navbar (each specified tab with name and icon)
    
    {
        // Name and icon for tab within sidebar
        text: "Dashboard",
        icon:<HomeOutlined />
    },
    {   
        // Title for section in sidebar
        text: "Client Facing",
        icon: null,
    },
    {
        // Name and icon for tab within sidebar 
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Customers",
        icon:<Groups2Outlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Transactions",
        icon:<ReceiptLongOutlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Geography",
        icon:<PublicOutlined />
    },
    {
        // Title for section in sidebar
        text: "Sales",
        icon: null,
    },
    {
        // Name and icon for tab within sidebar
        text: "Overview",
        icon:<PointOfSaleOutlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Daily",
        icon:<TodayOutlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Monthly",
        icon:<CalendarMonthOutlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Breakdown",
        icon:<PieChartOutlined />
    },
    {
        // Title for section in sidebar
        text: "Management",
        icon: null,
    },
    {
        // Name and icon for tab within sidebar
        text: "Admin",
        icon:<AdminPanelSettingsOutlined />
    },
    {
        // Name and icon for tab within sidebar
        text: "Performance",
        icon:<TrendingUpOutlined />
    },
]

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => { // ^^^ Various used parameters for this function ^^^
  const { pathname } = useLocation(); // pathname obtained by useLocation to get pathname of current location
  const [active, setActive] = useState(""); // Determines what page we currently are on
  const navigate = useNavigate();   // Allows navigation to other pages
  const theme = useTheme(); // Grabs current theme and colors

  useEffect(() => {
    setActive(pathname.substring(1));   // Whenever pathname changes, active value is set to the current URL to help determine current page
  }, [pathname]);

  // Creates sidebar layout with features
  return ( <Box component="nav">
    {isSidebarOpen && (
        <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": { // Custom property tag
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSixing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth
                },
            }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Typography variant="h4" fontWeight="bold"> 
                                    ECOMVISION
                                </Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({ text, icon }) => {
                            if(!icon){
                                return(
                                    <Typography key={text} sx={{ m:"2.25rem 0 1rem 3rem"}}>
                                        {text}
                                    </Typography>
                                );
                            }
                            const lcText = text.toLowerCase();

                            return(
                                <ListItem key={text} disablePadding>
                                    <ListItemButton 
                                        onClick={() => { 
                                            navigate(`/${lcText}`);
                                            setActive(lcText) 
                                        }}
                                        sx={{
                                            backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                            color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100],
                                        }}>
                                        <ListItemIcon
                                            sx={{
                                                ml: "2rem",
                                                color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100],
                                            }}>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {active === lcText &&(
                                            <ChevronRightOutlined sx={{ ml: "auto"}} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                <Box position="absolute" bottom="2rem">
                    <Divider />
                    <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                        <Box 
                            componenet="img" // Needs to be a self closing tag
                            alt="profile"   // If no image available
                            src={profileImage}
                            height="40px"
                            width="40px"
                            borderRadius="50%"  // Makes 'box' a circle
                            sx={{objectFit: "cover"}}
                            component="img"/>
                        <Box textAlign="left">
                            <Typography     // Sets up user's name
                            fontWeight="bold" 
                            fontSize="0.9rem"
                            sx={{color: theme.palette.secondary[100]}}>
                                {user.name} {/* Displays user's name in bottom left */}
                            </Typography>
                            <Typography // Sets up user's occupation
                            fontSize="0.8rem"
                            sx={{color: theme.palette.secondary[200]}}>
                                {user.occupation}   {/* Displays user's occupation below user's name in bottom left */}
                            </Typography>
                        </Box>
                        <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px",}}/> {/* Displays settings icon next to user profile in bottom left */}
                    </FlexBetween>
                </Box>
            </Drawer>
        )}
    </Box>
    );
};

export default Sidebar