import { app } from './app/app';
import { runMigrations } from './db';
import router from './routes/routes';
import { errorHandler } from './middlewares/error.middleware';

const port = process.env.PORT || 3000;

// Run Migrations on startup
runMigrations();

// Mount Routes
app.use('/api', router);

// Global Error Handler (must be last)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
