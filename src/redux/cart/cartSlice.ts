import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "./cartSliceType";

const initialState: CartState = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.count), 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.count), 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload)

            if (findItem) {
                findItem.count--
            }

            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.count), 0)
        },
        clearCart(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const { addItem, clearCart, minusItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;