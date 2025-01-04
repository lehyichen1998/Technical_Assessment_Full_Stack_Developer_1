import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './routes/item.route';

dotenv.config();

const app = express();
const PORT = 3005;

// Debugging middleware - log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World 123' });
});

// Use routers
app.use('/api', itemRouter);

// Error handling middleware
app.use((req, res) => {
    console.log(`404: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`⚡️ Server is running at http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- GET /');
    console.log('- GET /api/items');
});