const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
    const { targetUrl } = req.body;
    try {
        const response = await axios.post(targetUrl, {
            jsonrpc: "2.0",
            id: 1,
            method: "getHealth"
        }, { timeout: 8000 });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Node unreachable", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Igorhythm Proxy running on port ${PORT}`));
