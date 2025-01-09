import dotenv from 'dotenv';
import express from 'express';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`the server is running on port: ${PORT}`)
})