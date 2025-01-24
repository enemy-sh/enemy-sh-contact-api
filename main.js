import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import express from 'express';
import { env } from 'process';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const contactRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: {
        status: 429,
        message: 'Too many submissions, please try again after an hour.',
    },
    standardHeaders: true, 
    legacyHeaders: false,
});

const app = express();
app.set('trust proxy', 1);

const uri = env.URI;
const port = env.PORT || 4888;
const apiKey = env.API_KEY;
const origin = env.ORIGIN;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Not authenticated"})
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token"})
    }
}

app.use(cors({
    origin: origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.use((req, res, next) => {
    const allowedOrigins = [origin];
    const requestOrigin = req.headers.origin;
    
    if (!requestOrigin) {
        return res.status(403).json({ message: "Origin not allowed"});
    }

    if (requestOrigin && !allowedOrigins.includes(requestOrigin)) { 
        return res.status(403).json({ message: "Origin not allowed"});
    }
    next();
});

app.use(express.json());
app.post('/api/contact/', contactRateLimiter,verifyToken, async (req, res) => {
    const {
        name,
        email,
        message,
    } = req.body;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
            },
        body: {
            name: name,
            activated: false,
            position: 0,
            email: { primaryEmail: email, additionalEmails: [] },
            message: message,
            createdBy: { source: "API" } 
        }
    }
    try {
        const response = await fetch(`${uri}/contacts`, {...options, body: JSON.stringify(options.body)});
        const data = await response.json();
        console.log(data);
        res.status(200).json({ message: "Submitted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});