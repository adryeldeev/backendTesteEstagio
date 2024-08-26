import express from 'express'
import cors from 'cors'
import router from './routes.js'

import dotenv from 'dotenv'
dotenv.config();

const app = express()


app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  
  app.use(router)
  
  const port = process.env.PORT || 8000
  app.listen(8000, () => {
    console.log(`Server is runing ${port}`);
  })
