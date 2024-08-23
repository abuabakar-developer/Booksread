// pages/api/reviews.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Review from '../../models/Review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const { bookId } = req.query;
    
    if (typeof bookId !== 'string') {
      return res.status(400).json({ error: 'Invalid bookId' });
    }

    try {
      const reviews = await Review.find({ bookId });
      res.status(200).json({ reviews });
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else if (req.method === 'POST') {
    const { bookId, content, rating, userName } = req.body;
    
    if (!bookId || !content || !rating || !userName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newReview = new Review({ bookId, content, rating, userName });
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Failed to post review:', error);
      res.status(500).json({ error: 'Failed to post review' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

