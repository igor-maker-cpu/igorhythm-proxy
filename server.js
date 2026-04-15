
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Umesto upisivanja IP adrese ovde, koristimo "šifru" koju ćemo podesiti na Renderu
const STATIC_IP = process.env.MY_NODE_IP;

app.get('/proxy/:port', async (req, res) => {
    // Ako zaboraviš da podesiš varijablu na Renderu, javiće ovu grešku
    if (!STATIC_IP) {
        return res.status(500).json({ greska: "IP adresa nije konfigurisana na serveru." });
    }

    const port = req.params.port;
    const ciljniURL = `http://${STATIC_IP}:${port}`;
   
    try {
        const odgovor = await axios.get(ciljniURL, { timeout: 8000 });
        res.json(odgovor.data);
    } catch (greska) {
        res.status(500).json({
            greska: "Čvor nedostupan na statičkoj adresi",
            detalji: greska.message,
            pokusao_na: ciljniURL
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proksi radi na portu ${PORT}`));
