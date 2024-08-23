//pages/api/books.js
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const BASE_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Books API');
    }
    const data = await response.json();

    const books = data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      cover_url: item.volumeInfo.imageLinks?.thumbnail,
      author_name: item.volumeInfo.authors || [],
      public_rating: item.volumeInfo.averageRating || 'Not Available',
      published_year: item.volumeInfo.publishedDate || 'Not Available',
    }));

    res.status(200).json({ items: books });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


