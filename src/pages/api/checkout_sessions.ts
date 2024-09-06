import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Ensure the API version is correct
});

// Define the type for the line items expected in req.body.items
type LineItem = {
  name: string;
  price: number; // Price in cents
  quantity: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map((item: LineItem) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price, // Price in cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,  // Success URL
        cancel_url: `${req.headers.origin}/cancel`,    // Cancel URL
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}


