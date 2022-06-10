import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from '../Feature/LoginUserSlice'

const store = configureStore({
    reducer : {
        newUser : loginUserReducer,
    },
})

export default store