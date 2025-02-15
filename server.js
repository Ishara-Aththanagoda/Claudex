
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

//login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        return res.json({ success: true, message: 'Login successful!' });
    } else {
        return res.status(400).json({ success: false, message: 'Missing credentials' });
    }
});

// API integration route
app.get('/api/advice', async (req, res) => {
    try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching advice' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
