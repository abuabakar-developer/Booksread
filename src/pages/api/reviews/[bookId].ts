import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Review from '../../../models/Review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { bookId } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const reviews = await Review.find({ bookId });
        res.status(200).json({ success: true, reviews });
      } catch (error) {
        const errorMessage = (error as Error).message || "An unknown error occurred";
        res.status(400).json({ success: false, message: errorMessage });
      }
      break;
    case 'POST':
      try {
        const { userName, rating, comment } = req.body;
        const newReview = new Review({ bookId, userName, rating, comment });
        await newReview.save();
        res.status(201).json({ success: true, review: newReview });
      } catch (error) {
        const errorMessage = (error as Error).message || "An unknown error occurred";
        res.status(400).json({ success: false, message: errorMessage });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}


