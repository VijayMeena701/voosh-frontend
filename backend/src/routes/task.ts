import { Router, Request, Response } from 'express';
import { Task } from '../models/task';
import { Status } from '../models/status';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// Get all tasks for authenticated user
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const statuses = await Status.findAll({
            include: [{ model: Task, where: { userId: (req as any).user.id }, required: false }],
            order: [['id', 'ASC'], [Task, 'id', 'ASC']],
        });

        const allStatuses = statuses.map(status => ({
            id: status.id.toString(),
            name: status.name,
            data: status.Tasks.map((task: { id: { toString: () => any; }; title: any; description: any; createdAt: { toISOString: () => any; }; }) => ({
                id: task.id.toString(),
                title: task.title,
                desc: task.description,
                createdAt: task.createdAt.toISOString(),
            })),
        }));

        res.json(allStatuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new task
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    const { title, description, statusId } = req.body;

    try {
        const newTask = await Task.create({
            title,
            description,
            userId: (req as any).user.id,
            statusId,
            createdAt: new Date(),
        });

        const returned = {
            id: newTask.id,
            title: newTask.title,
            desc: newTask.description,
            createdAt: newTask.createdAt
        }

        res.status(201).json(returned);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// Update a task
router.patch('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, desc, statusId } = req.body;

    try {
        const task = await Task.findOne({ where: { id, userId: (req as any).user.id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.title = title;
        task.description = desc;
        task.statusId = statusId;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({ where: { id, userId: (req as any).user.id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as tasksRouter };
