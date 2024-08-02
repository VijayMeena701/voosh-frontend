import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const router = Router();
const JWT_SECRET = 'your_jwt_secret';

router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        res.status(400).json({ error: 'Email already exists' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as authRouter };
