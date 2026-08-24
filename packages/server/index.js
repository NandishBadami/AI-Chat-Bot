import express from "express";

const app = express();

app.get('/', (req, res) => res.send("Hello World"));

app.get('/api/hello/', (req, res) => res.json({message: 'Hello World!'}));

app.listen(3000, err => {
    if(err) throw err;
    console.log('http://localhost:3000');
});