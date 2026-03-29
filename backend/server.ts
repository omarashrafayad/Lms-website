// / <reference path="./types/express.d.ts" />
import path from 'path'
import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import DBconnection from './config/database'
import categoryRoute from './routes/categoryRoute'
import subCategoryRoute from './routes/subCategoryRoute'
import courseRoute from './routes/courseRoute'
import homeRoute from './routes/homeRoute'
import userRoute from './routes/userRoute'
import authRoute from './routes/authRoute'
import reviewRoute from './routes/reviewRoute'
import wishlistRoute from './routes/wishlistRoute'
import addressRoute from './routes/addressRoute'
import couponRoute from './routes/couponRoute'
import cartRoute from './routes/cartRoute'
import orderRoute from './routes/orderRoute'
import lessonRoute from './routes/lessonRoute'
import examRoute from './routes/examRoute'
import resultRoute from './routes/resultRoute'
import blogRoute from './routes/blogRoute'
import membershipRoute from './routes/membershipRoute'
import chatRoute from './routes/chatRoute'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import globalError from './middlewares/errorMiddleware'
import ApiError from './utils/apiError'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerOptions from './config/swagger'

dotenv.config({ path: './config.env' })

const app = express();
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await DBconnection(); 
    next();
  } catch (error) {
    next(new ApiError('Database connection failed', 500));
  }
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://lms-website-r361.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('query parser', 'extended');

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/home', homeRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/addresses', addressRoute);
app.use('/api/v1/coupon', couponRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/lessons', lessonRoute);
app.use('/api/v1/exams', examRoute);
app.use('/api/v1/results', resultRoute);
app.use('/api/v1/blogs', blogRoute);
app.use('/api/v1/memberships', membershipRoute);
app.use('/api/v1/chats', chatRoute);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use(globalError)

const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
export default app;