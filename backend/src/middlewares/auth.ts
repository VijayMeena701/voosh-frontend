// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Adjust this import according to your setup

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.sendStatus(403); // Forbidden
        }

        // Attach user to the request object in a non-standard way
        (req as any).user = user.dataValues;
        next();
    } catch (err) {
        res.sendStatus(403); // Forbidden
    }
};
