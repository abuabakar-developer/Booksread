import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Checkout = () => {
  const router = useRouter();
  const { bookName, bookPrice } = router.query; // Ensure bookPrice is in cents (integer)

  useEffect(() => {
    const createCheckoutSession = async () => {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            { name: bookName, price: parseInt(bookPrice as string, 10), quantity: 1 }, // Parse price correctly
          ],
        }),
      });

      const session = await response.json();

      const stripe = await stripePromise;

      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.warn('Error:', error);
      }
    };

    if (bookName && bookPrice) {
      createCheckoutSession();
    }
  }, [bookName, bookPrice]);

  return <div>Redirecting to Stripe...</div>;
};

export default Checkout;
