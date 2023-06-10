import React from 'react'
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from 'state/api';
import Header from "components/Header";
import { DataGrid } from '@mui/x-data-grid';

const Customers = () => {
    const theme = useTheme();
    const { data, isLoading} = useGetCustomersQuery();

    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => { // Obtains parameters from cell (phone number [9032440345])
          return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")  // Regex formatting for proper display [(903)-244-0345]
        }
      },
      {
        field: "country",
        headerName: "Country",
        flex: 0.4,
      },
      {
        field: "occupation",
        headerName: "Occupation",
        flex: 0.4,
      },
      {
        field: "role",
        headerName: "Role",
        flex: 0.5,
      }
    ]

  return <Box m="1.5rem 2.5rem">
    <Header title="CUSTOMERS" subtitle="List of Customers" />
    <Box 
      mt="40px" 
      height="75vh" // vh = viewing height (dynamic adjustment for sizing
      sx={{ // Changes specific parts of the DataGrid box (marked by class name)
        "& .MuiDataGrid-root":{
          border: "none"
        },
        "& .MuiDataGrid-cell":{
          borderBottom: "none"
        },
        "& .MuiDataGrid-columnHeaders":{
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none"
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.primary.alt,
          color: theme.palette.secondary[100],
          borderTop: "none"
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important` // !important makes sure it overrides properly
        }
      }}> 
        <DataGrid 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
    </Box>
</Box>
};

export default Customers;