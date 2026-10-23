import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../catalog/model/types'

export type CartItem = Product & { quantity: number }
type CartState = { items: CartItem[] }

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.id === action.payload)
      if (item) item.quantity += 1
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
