import { createSlice } from "@reduxjs/toolkit"; 
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
const axios = require('axios')

const initialState = {
    loading : false,
    products : [],
    error : ''
}

export const getProduct =createAsyncThunk('/fetchProduct', ()=>{
    return axios.get('http://localhost:3001/fetchProduct').then(response => {
        return response
    })
})

const productSlice = createSlice({
    name : "products",
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(getProduct.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getProduct.fulfilled, (state, action)=>{
            state.loading = false
            state.products = action.payload
            state.error = ''
        })

        builder.addCase(getProduct.rejected, (state, action)=>{
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
    }
})


export default productSlice.reducer