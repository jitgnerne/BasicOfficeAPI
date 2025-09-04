import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import workerRouter from "./Routers/workerRouter.js";

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());

app.use(cors({
    origin:'*'
}));

app.use('/', workerRouter);

app.listen(PORT, () => {
    console.log(`This server is open on PORT: ${PORT}`);
}); 
