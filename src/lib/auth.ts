import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Type for the user stored in the token
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

// Declare JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;

// Extend the NextApiRequest to include a `user` property
interface CustomNextApiRequest extends NextApiRequest {
  user?: UserPayload;
}

// Type for the handler function
type Handler = (req: CustomNextApiRequest, res: NextApiResponse) => Promise<void> | void;

// Middleware function to authenticate token
export const authenticateToken = (handler: Handler) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    // Add the user to the request object
    req.user = user as UserPayload;
    return handler(req, res);
  });
};






