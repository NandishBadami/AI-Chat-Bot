import express from "express";

const app = express();

app.get('/', (req, res) => res.send(process.env.GEMINI_API_KEY));

app.listen(3000, err => {
    if(err) throw err;
    console.log('http://localhost:3000');
});