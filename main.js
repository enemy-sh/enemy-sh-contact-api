import fetch from 'node-fetch';
import express from 'express';
import dotenv from 'dotenv';
import { env } from 'process';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const uri = env.URI
const port = env.PORT || 4888;
const apiKey = env.API_KEY;

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

app.use(express.json());
app.post('/api/contact/', verifyToken, async (req, res) => {
    const {
        name,
        email,
        message,
        email: { primaryEmail, additonalEmails }
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
            email: email,
            message: message,
            createdBy: { source: "API" } 
        }
    }
    try {
        const response = await fetch(`${uri}/contacts`, {...options, body: JSON.stringify(options.body)});
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
