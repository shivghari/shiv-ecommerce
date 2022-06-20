import { createSlice } from '@reduxjs/toolkit'

var initialState = {
    userID : "",
    cartItem : {},
    totalItem : 0,
    totalAmount : 0,  
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addItem : (state, action)=>{
            if(state.cartItem[action.payload.productID]){
               
                if(action.payload.total){
                    state.cartItem[action.payload.productID] = state.cartItem[action.payload.productID] + action.payload.total
                    state.totalItem = state.totalItem + action.payload.total    
                }else{
                    state.cartItem[action.payload.productID] ++
                    state.totalItem ++
                }
                state.totalAmount = state.totalAmount + action.payload.price
            }else{
                
                if(action.payload.total){
                    state.cartItem[action.payload.productID] =  action.payload.total
                    state.totalItem = state.totalItem + action.payload.total
                }else{
                    state.totalItem ++
                    state.cartItem[action.payload.productID] = 1
                }
                state.totalAmount = state.totalAmount + action.payload.price
            }
        },

        removeItem : (state, action)=>{
            if(state.cartItem[action.payload.productID] > 0){
                state.totalItem--
                state.totalAmount = state.totalAmount - action.payload.price
                state.cartItem[action.payload.productID]--
            }
        },

        clearCart : (state, action)=>{
            state.cartItem = {}
            state.totalItem = 0
            state.totalAmount = 0
        },

        setUser : (state, action)=>{
            state.userID = action.payload.userID
        }
    }
})

export default cartSlice.reducer
export const {addItem, removeItem, clearCart, setUser} = cartSlice.actions