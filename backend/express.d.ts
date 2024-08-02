import { User } from './src/models/user'; // Adjust the import according to your User model location
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: User; // You can define the type according to your User model
    }
}
