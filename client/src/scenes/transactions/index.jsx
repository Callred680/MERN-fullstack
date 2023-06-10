import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();

    // Values to be sent to backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const {data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });
    console.log('data',data)

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
          },
          {
            field: "userID",
            headerName: "User ID",
            flex: 1,
          },
          {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
          },
          {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length, // Grabs number of products within transaction
          },
          {
            field: "cost",  // Field is not set as Number, set as string so sorting will not be correct
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
          }
    ];

    return (<Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of Transactions" />
        <Box 
        height="80vh"
        sx={{ // Changes specific parts of the DataGrid box (marked by class name)
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`, // !important makes sure it overrides properly
            },
        }}>
            <DataGrid 
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={(data && data.transactions) || []}
                columns={columns}
                // Server side pagination properties to be set
                rowCount={(data && data.total) || 0}
                rowsPerPageOptions={[20, 50, 100]}
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode="server"
                sortingMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                // Custom tool bar by passing in components
                components={{ Toolbar: DataGridCustomToolbar }}
                componentProps={{
                  toolbar: { searchInput, setSearchInput, setSearch },  // Grabs values from data grip toolbar
                }}
            />
        </Box>
    </Box>
    );
};

export default Transactions;