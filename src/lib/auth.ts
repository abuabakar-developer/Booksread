import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;


interface CustomNextApiRequest extends NextApiRequest {
  user?: UserPayload;
}

type Handler = (req: CustomNextApiRequest, res: NextApiResponse) => Promise<void> | void;

export const authenticateToken = (handler: Handler) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });


    req.user = user as UserPayload;
    return handler(req, res);
  });
};






