import express from "express";
import bodyParser from "body-parser";

import { llmGemini } from "./scripts/model.js";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(bodyParser.json());


app.post('/chat', async (req, res) => {
    const { text } = req.body;  

    if (!text) {
        return res.status(400).json({ error: 'É necessário um texto' });
    }

    
    const processedText =   await llmGemini(text);
    
    
    res.json({ processedText });
});

app.listen(PORT, () => {
    console.log(`servidor está rodando em http://localhost:${PORT}`);
});


