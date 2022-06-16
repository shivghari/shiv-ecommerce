import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

var jwt = ""

try {
    jwt = JSON.parse(localStorage.getItem('token')).token
}
catch {
    jwt = "notlogin"
}


const findUserHeader = {
    "Authorization": jwt
}

const baseUrl = 'http://localhost:3001'

const createRequest = (url) => ({ url, headers: findUserHeader })

export const findUserApi = createApi({
    reducerPath: "findUserApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (userID) => createRequest(`/findUser/${userID}`),
        })
    })
})

export const { useGetUserQuery } = findUserApi;