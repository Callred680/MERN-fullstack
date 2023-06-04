import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    // baseURL will be based on hosting app (different than url in .env.local file)
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),  // Environmnet variable (baseUrl = localhost)
    reducerPath: "adminApi",
    tagTypes: ["User"],  // Represents the value/state you can identify a particular data
    endpoints: (build) => ({
        // Identifies API calls that can be made
        getUser: build.query({
            // Base Url is attached beforehand
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        })
    })
})

export const {
    useGetUserQuery // Comes from getUser
} = api;