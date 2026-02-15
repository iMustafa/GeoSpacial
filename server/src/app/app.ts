import express from 'express';
import cors from 'cors';
import { errorHandler } from '../middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('GeoSpacial Server is Running!');
});

// Global Error Handler
app.use(errorHandler);

export { app };
