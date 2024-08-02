import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { authenticateToken } from '../middlewares/auth';
import { Op, literal } from 'sequelize';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        let hashedPassword = password ? await bcrypt.hash(password, +SALT_ROUNDS) : null;

        const oldUser = await User.findOne({ where: literal('email = :email'), replacements: { email } });
        if (oldUser?.dataValues) return res.status(409).json({ error: "User with this email already exists" })

        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
        const token = jwt.sign({ userId: newUser.id, firstName: newUser.firstName }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Email already exists' });
    }
});

// User login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password, provider = "local" } = req.body;

    try {
        const user = await User.findOne({ where: literal('email = :email'), replacements: { email } });
        if (!user || (provider === 'local' && !(await bcrypt.compare(password, user.password)))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user profile
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk((req as any).user.id, {
            attributes: ['id', 'email']
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as usersRouter };
