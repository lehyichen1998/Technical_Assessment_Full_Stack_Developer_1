import { Request, Response } from 'express';
import pool from '../db';
import { z } from 'zod';

const ItemSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    description: z.string().nullable(),
    price: z.number().positive({ message: "Price must be a positive number" }),
});

export const getAllItemsController = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM items ORDER BY created_at DESC');
        
        res.status(200).json({
            message: 'Get all items successful',
            data: rows
        });
    } catch (error) {
        console.error('Error in getAllItemsController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createItemController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body);

        // Validate the request body using Zod
        const validationResult = ItemSchema.safeParse(req.body);

        if (!validationResult.success) {
            // Return validation errors
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResult.error.errors.map(error => ({
                    path: error.path.join('.'),
                    message: error.message,
                })),
            });
        }

        const { name, description, price } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
            [name, description || null, price]
        );

        res.status(201).json({
            message: 'Item created successfully',
            data: {
                name,
                description,
                price
            }
        });
    } catch (error) {
        console.error('Error in createItemController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getItemController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body);
        const itemId = parseInt(req.params.id, 10); // Parse the ID from the URL parameter

        if (isNaN(itemId)) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        const [rows] = await pool.execute(
            'SELECT * FROM items WHERE id = ?',
            [itemId]
        );


        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error getting item:', error);
        
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateItemController = async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.id, 10);
        if (isNaN(itemId)) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }
console.log(req.body);
        // Validate the request body using Zod
        const validationResult = ItemSchema.safeParse(req.body);
console.log(validationResult);
        if (!validationResult.success) {
            // Return validation errors
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResult.error.errors.map(error => ({
                    path: error.path.join('.'),
                    message: error.message,
                })),
            });
        }

        const { name, description, price } = req.body;

        const [result] = await pool.execute(
            'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?',
            [name, description || null, price, itemId]
        );

        res.status(200).json({
            message: 'Item updated successfully',
            data: {
                id: itemId,
                name,
                description,
                price
            }
        });
    } catch (error) {
        console.log();
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item' });
    }
};

export const deleteItemController = async (req: Request, res: Response) => {
    try {
        const itemId = parseInt(req.params.id, 10);
        if (isNaN(itemId)) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        const [result] = await pool.execute(
            'DELETE FROM items WHERE id = ?',
            [itemId]
        );

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item' });
    }
};