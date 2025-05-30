const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch').default;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdJA5VMuzkvLQBgc9upuyy1FmO5yJYMYQTdM5u7NPyUfrBL1zJ8lZmm94-4v2mxxr9/exec'; // Ganti dengan URL Web App kamu

app.post('/order', async (req, res) => {
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: req.body })
        });
        const text = await response.text();
        console.log('Response from Apps Script:', text); // Tambahkan log ini
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            return res.status(500).json({ error: 'Apps Script tidak membalas JSON. Cek URL dan deployment.' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});