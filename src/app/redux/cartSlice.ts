
// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Book {
    id: string;
    title: string;
    author: string;
    quantity: number;
    cover_image: 'https://example.com/great-gatsby.jpg',
    price: 10,
}


export interface CartState {
    books: Book[];
}
      

const initialState: CartState = {
    books: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            const book = state.books.find((book) => book.id === action.payload.id);

            if (book) {
                book.quantity = action.payload.quantity;
            } else {
                state.books.push(action.payload);
            }
        },
        removeBook: (state, action: PayloadAction<{ id: string }>) => {
            state.books = state.books.filter((book) => book.id !== action.payload.id);
        },
    },
});

export const { addBook, removeBook } = cartSlice.actions;

export default cartSlice.reducer;
    
