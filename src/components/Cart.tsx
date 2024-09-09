// src/components/Cart.tsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types/rootState';
import { removeBook } from '@/app/redux/cartSlice';
          
interface Book {
    id: string;
    title: string;
}

const Cart = () => {
    const { books } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveBook = (id: string) => {
        dispatch(removeBook({ id }));
    };

    return (
        <div>
            {books.map((book: Book) => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;

