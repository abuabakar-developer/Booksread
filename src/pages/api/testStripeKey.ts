import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

async function testStripeKey() {
  try {
    const account = await stripe.account.retrieve();
    console.log('Account Info:', account);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testStripeKey();
export default testStripeKey;