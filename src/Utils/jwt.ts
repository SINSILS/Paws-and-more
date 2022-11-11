import { JWT_SECRET } from '../constants';
import { HttpException } from '../exceptions/httpException';
import jwt from 'jsonwebtoken';

export const signToken = (id: string, role: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) reject(new HttpException(500, 'Internal server error'));

      resolve(token);
    });
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return decoded;
  } catch {
    throw new HttpException(401, 'Unauthorized');
  }
};
