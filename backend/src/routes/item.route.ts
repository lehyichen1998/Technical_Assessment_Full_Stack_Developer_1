import { Router } from 'express';
import { Request, Response } from 'express';
import { getAllItemsController, deleteItemController, createItemController,getItemController, updateItemController } from '../controllers/item.controller';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Test route working!' });
});

router.get('/items', getAllItemsController);
router.get('/items/:id', async (req, res) => {
    try {
        await getItemController(req, res);
    } catch (error) {
    }
});
router.post('/items', async (req, res) => {
    try {
        await createItemController(req, res);
    } catch (error) {
    }
});

router.put('/items/:id', async (req, res) => {
    try {
        await updateItemController(req, res);
    } catch (error) {
    }
});

router.delete('/items/:id', async (req, res) => {
    try {
        await deleteItemController(req, res);
    } catch (error) {
    }
});

export default router; 