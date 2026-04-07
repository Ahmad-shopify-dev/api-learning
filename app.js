import express from 'express'
import { PORT } from './configurations/env.js'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connnectToDatabase from './database/mongodb.js';
import errorMiddlewareHandler from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// SOME MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

// 404 ROUTER FOR OTHER ENDPOINTS
app.use("/api", (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

// ERROR MIDDLEWARE
app.use(errorMiddlewareHandler);

// USING ARCJET FOR SECURITY AND RATE LIMIT
app.use(arcjetMiddleware);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Subscription API by @STACKWISEDEV"
    });
});

app.listen(PORT, async () => {
    console.log(`Running server on http://localhost:${PORT}`);
    await connnectToDatabase();
});
