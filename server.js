const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
    try {
        const { targetUrl } = req.body;
        // Koristimo .get umesto .post jer tvoj Node tako radi
        const response = await axios.get(targetUrl, { timeout: 8000 });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Node unreachable", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
