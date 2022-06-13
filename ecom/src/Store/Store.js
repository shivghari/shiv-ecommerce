import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from '../Feature/LoginUserSlice'
import { findUserApi } from '../Feature/FindUserSlice'
import { fetchProduct } from "../Feature/FetchProducts";

const store = configureStore({
    reducer : {
        newUser : loginUserReducer,
        [findUserApi.reducerPath] : findUserApi.reducer,
        [fetchProduct.reducerPath] : fetchProduct.reducer,

    },
})

export default store