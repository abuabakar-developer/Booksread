import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

async function testStripeKey() {
  try {
    const account = await stripe.accounts.retrieve(); // Corrected method
    console.log('Account Info:', account);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

testStripeKey();

export default testStripeKey;









