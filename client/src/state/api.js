import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    // baseURL will be based on hosting app (different than url in .env.local file)
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),  // Environmnet variable (baseUrl = localhost = server)
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography"],  // Represents the tag type you can identify a particular data call with
    endpoints: (build) => ({
        // Identifies API calls that can be made
        getUser: build.query({
            // Base Url is attached beforehand
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            provideTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({ // If parameters need to be included for a query call, this is the formatting
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: [ "Transactions" ],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography",]
        }),
    }),
});

export const {
    useGetUserQuery, // Comes from getUser
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
} = api;