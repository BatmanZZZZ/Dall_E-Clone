import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./mongoDB/connect.js";
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes); // Add a forward slash (/) before the route path
app.use('/api/v1/dalle', dalleRoutes); // Add a forward slash (/) before the route path

app.get('/', async (req, res) => {
    res.send('Hello from Dall-E');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8081, () => {
            console.log("Server started on port 8081");
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();
