import { Typography, Box, useTheme } from "@mui/material";
import React from 'react'

const Header = ( {title, subtitle} ) => {
  const theme = useTheme();
  return(
    <Box>
        <Typography variant="h2" color={theme.palette.secondary[100]} fontWeight="bold" sx={{ md: "5px"}} >
            {title}
        </Typography>
        <Typography variant="h5" color={theme.palette.secondary[100]} >
            {subtitle}
        </Typography>
    </Box>
  )
}

export default Header