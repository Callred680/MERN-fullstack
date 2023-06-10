import React, {useState} from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; // Allow for template layouts
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

// Layout = Sets up formatted box for objects to be placed inside it
// Navbar = Exists on every single page
// Outlet = Represents whatever component is underneath the Navbar

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");  // Used for deciding if user is on mobile or desktop version
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId); // grabs user ID from redux toolkit, not the query
  const { data } = useGetUserQuery(userId); // Api call
  //console.log("data", data);

  // flex = desktop screen, block = mobile screen
  return(
  <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
      user={data || {}} // Sends empty object if no data is retrieved (prevents app from breaking because of undefined return value)
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
    <Box flexGrow = {1}> {/* Sets box to take up as much space as possible (Fill entire bar for proper alignment) */}
      <Navbar
        user={data || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet /> 
    </Box>
  </Box>
  );  
};

export default Layout