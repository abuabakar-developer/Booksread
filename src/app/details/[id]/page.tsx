
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';
import Image from 'next/image';
import ReviewModal from '@/components/ReviewModal';
import ReviewCard from '@/components/ReviewCard';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Details = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const URL = `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`;
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const reviewSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { 
    const fetchDetails = async () => { 
      try {
        const res = await fetch(URL);
        const data = await res.json();

        const details = {
          title: data.volumeInfo.title,
          desc: data.volumeInfo.description || "No description available",
          id: data.id,
          cover_image: data.volumeInfo.imageLinks?.thumbnail || "/no-cover.jpg",
          pages: data.volumeInfo.pageCount || "N/A",
        };

        setBook(details);
      } catch (error) {
        console.log('Error fetching book details:', error);
      }
    };
    fetchDetails();
  }, [URL]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?bookId=${id}`);
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log('Error fetching reviews:', error);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [id]);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const handleAddToCart = async () => {
    if (!book) return;

    const price = book.pages !== "N/A" ? ((book.pages / 100) * 5).toFixed(2) : "0.00";

    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name: book.title,
              price: parseFloat(price) * 100,
              quantity: 1
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const { id } = await res.json();

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session or redirecting to checkout:', error);
    }
  };

  const handleShowReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReviewSubmit = async (newReview: any) => {
    try {
      const res = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      const reviewData = await res.json();
      setReviews(prevReviews => [reviewData, ...prevReviews]);
      handleHideModal();
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 p-10 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Mobile layout: image on top, then content */}
          <div className="flex-1 order-2 md:order-1 relative h-80">
            <Image
              src={book.cover_image}
              alt="book cover"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 flex flex-col order-1 md:order-2">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">{book.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{book.desc}</p>
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold text-green-800">Price: ${(book.pages !== "N/A" ? (book.pages / 100) * 5 : 0).toFixed(2)}</span>
              <span className="text-2xl font-semibold text-gray-800">Pages: {book.pages}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full flex items-center shadow-md transition transform hover:scale-105"
              >
                Add to Cart <BsFillCartFill className="ml-2" />
              </button>
              <button
                onClick={() => {
                  handleShowModal();
                  handleShowReviews();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full flex items-center shadow-md transition transform hover:scale-105"
              >
                Review Book <FiStar className="ml-2" />
              </button>
            </div>
            {showModal && (
              <ReviewModal
                handleHideModal={handleHideModal}
                bookId={book.id}
                onSubmit={handleReviewSubmit}
              />
            )}
          </div>
        </div>
        <div
          ref={reviewSectionRef}
          className="mt-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h2>
          <div className="grid gap-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Details;


