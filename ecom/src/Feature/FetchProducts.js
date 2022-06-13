import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
var jwt 
try {
    jwt = JSON.parse(localStorage.getItem('token')).token
}
catch(err){
    jwt = ""
}

const findUserHeader = {
    "Authorization" : jwt
} 

const baseUrl = 'http://localhost:3001'

const createRequest = (url) =>({url, headers: findUserHeader})

export const fetchProduct = createApi({
    reducerPath : "fetchProduct",
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder)=>({
        getProducts : builder.query({
            query : () => createRequest(`/fetchProduct`),
        })
    })
})

export const { useGetProductsQuery } = fetchProduct;