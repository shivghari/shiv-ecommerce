import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userID : "",
    token : "",
    username : "",
    email : ""
}

const loginUserSlice = createSlice({
    name : "loginUserSlice",
    initialState,
    reducers : {
        newUser : (state, action)=>{
            state.token = action.payload.token
            state.userID = action.payload.userID
            state.username = action.payload.username
            state.email = action.payload.email
        }
    }
})

export default loginUserSlice.reducer
export const { newUser } = loginUserSlice.actions