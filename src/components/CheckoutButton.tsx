import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutButton = ({ items }: { items: Array<{ id: string; quantity: number }> }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    const { id } = await response.json();
    const stripe = await stripePromise;

    const { error } = await stripe!.redirectToCheckout({ sessionId: id });

    if (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button
      role="link"
      onClick={handleClick}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  );
};

export default CheckoutButton;

