// src/types/cartTypes.ts

export interface Book {
    id: string;          // Unique identifier for the book
    title: string;       // Title of the book
    cover_image: string; // URL to the book's cover image
    quantity: number;    // Quantity of the book in the cart
    price: number;       // Price of a single unit of the book
}



