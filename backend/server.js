import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


import sender from './routes/sender.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 8080;

app.listen(PORT , (req , res) => {
    console.log(`Server listening on the PORT: http://localhost:${PORT} `);
});

app.get('/' , (req , res) =>{
    res.send("Hello from server!!");
})

app.use("/contact" , sender);