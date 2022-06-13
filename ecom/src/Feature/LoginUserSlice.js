import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    userID :  "",
    token : "",
    username : "",
    email :  ""
}
const loginUserSlice = createSlice({
    name : "loginUserSlice",
    initialState,
    reducers : {
        newUser : (state, action)=>{
            if(action.payload.token){
                state.token = action.payload.token
            }
            if(action.payload.userID){
                state.userID = action.payload.userID
            }
            state.username = action.payload.username
            state.email = action.payload.email
        }
    }
})

export default loginUserSlice.reducer
export const { newUser } = loginUserSlice.actions