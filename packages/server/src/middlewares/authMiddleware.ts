import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const AUTH_API_URL = 'https://ya-praktikum.tech/api/v2/auth'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authCookie = req.cookies?.authCookie || req.headers['cookie'];
    const uuid = req.cookies?.uuid || req.headers['x-uuid'];
    console.log(req.cookies, uuid)
    if (!authCookie || !uuid) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const response = await axios.get(`${AUTH_API_URL}/user`, {
      headers: {
        Cookie: `authCookie=${authCookie}; uuid=${uuid}`,
      },
      withCredentials: true,
    });

    if (!response.data?.id) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Authentication failed' });
  }
};