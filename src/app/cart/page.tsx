
//cart
"use client"
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { removeBook } from '../redux/cartSlice'
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
    const { books } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    let totalPrice = 0;
    books.map((book) => totalPrice += (book.quantity * book.price))

    const handleRemoveBook = (book) => {
        dispatch(removeBook({ id: book?.id }))
    }

    const handleCheckout = async () => {
        const lineItems = books.map((book) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: book.title
                    },
                    unit_amount: book.price * 100
                },
                quantity: book.quantity
            }
        })

        const res = await fetch("/api/checkout", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(lineItems)
        })

        const data = await res.json()

        const stripe = await stripePromise

        await stripe.redirectToCheckout({ sessionId: data.id })
    }

    console.log(books.length)

    return (
        <div className="container mx-auto p-4">
            {books?.length > 0 && <h2 className="text-2xl font-semibold mb-4">Your cart</h2>}
            <div className="flex flex-wrap">
                <div className="w-full md:w-2/3">
                    {books?.length > 0
                        ? books?.map((book) => {
                            return <div key={book.id} className="flex items-center mb-4 p-4 border rounded-lg shadow-md">
                                <div className="cursor-pointer mr-4" onClick={() => handleRemoveBook(book)}>
                                    <AiOutlineClose />
                                </div>
                                <Link href={`/details/${book.id}`}>
                                    <Image src={book?.cover_image} width="175" height="375" className="w-24 h-32 object-cover" />
                                </Link>
                                <div className="ml-4 flex-grow">
                                    <h3 className="text-lg font-semibold">{book?.title}</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="mr-2">{book.quantity} x</span>
                                        <span className="font-semibold">${book?.price}</span>
                                    </div>
                                </div>
                            </div>
                        })
                        : <h1 className="text-xl font-semibold">No books in the cart. Go Shopping!</h1>
                    }
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <div className="mb-4">
                        Total books: {books?.length}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold mb-2">
                            Subtotal: ${totalPrice > 100 ? totalPrice : totalPrice + 5}
                        </span>
                        <button 
                            onClick={handleCheckout} 
                            disabled={books?.length === 0} 
                            className={`py-2 px-4 rounded-lg ${books?.length === 0 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white`}>
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

