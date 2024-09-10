import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes.js'
dotenv.config();


const app = express();


app.use(cors({
  origin: ['https://front-end-teste-estagio-a6bs9y8x5-adryeldeevs-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))


app.use(express.json());



app.use(router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
