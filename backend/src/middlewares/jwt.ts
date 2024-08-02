import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { decrypt } from "../utils/crypto";

const secretKey = process.env.JWT_SECRET;

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];

    if (!secretKey) throw new Error('JWT_SECRET env variable is not defined');

    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];


        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
            }
            else {
                const { iat, expiresIn } = decrypt(decoded?.toString())
                if ((iat + expiresIn) < new Date().getTime()) {
                    throw Object.assign(new Error("Token Expired"), { statusCode: 401 });
                }
                next();

            }
        });
    } else {
        throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
    }
};

export default jwtMiddleware;
