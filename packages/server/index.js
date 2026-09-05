import express from "express";
import { GoogleGenAI } from '@google/genai';
import z from 'zod';
import cors from 'cors'

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://ai-chat-bot-client-tau.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get('/', (req, res) => res.send("Hello World"));

app.get('/api/hello/', (req, res) => res.json({message: 'Hello World!'}));

const conversations = new Map();

const chatSchema = z.object({
    prompt: z.string()
    .trim()
    .min(1, 'Prompt is required.')
    .max(1000, 'Prompt is too long (max 1000 characters)'),
    conversationId: z.string().uuid()
});

app.post('/api/chat', async (req, res) => {
    const parseResult = chatSchema.safeParse(req.body);
    if(!parseResult.success) return res.status(400).json(parseResult.error.format());

    try {
        const { prompt, conversationId } = req.body;
    
        const response = await client.interactions.create({
            model: 'gemini-3.6-flash',
            input: prompt,
            generation_config: {
                temperature: 0.2,
                max_output_tokens: 500
            },
            previous_interaction_id: conversations.get(conversationId)
        });

        conversations.set(conversationId, response.id);
        console.log(conversations);
        res.json({message: response.output_text});
    } catch (error) {
        res.status(500).json({error: error.body && error.body.includes('You exceeded your current quota') ? 'Failed to generate response! Out of Tokens, Try tomorrow at this same time.': 'Failed to generate response!'});
    }
});

app.listen(3000, err => {
    if(err) throw err;
    console.log('http://localhost:3000');
});