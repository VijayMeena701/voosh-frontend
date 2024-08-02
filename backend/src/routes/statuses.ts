import { Router, Request, Response } from 'express';
import { Status } from '../models/status';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// Get all statuses
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const statuses = await Status.findAll();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new status
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const newStatus = await Status.create({ name });
        res.status(201).json(newStatus);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// Update a status
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const status = await Status.findByPk(id);
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }

        status.name = name;
        await status.save();
        res.json(status);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// Delete a status
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const status = await Status.findByPk(id);
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }

        await status.destroy();
        res.json({ message: 'Status deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as statusesRouter };
