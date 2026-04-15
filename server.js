
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// KLJUČNA PROMENA: Koristimo GET i parametar :port
app.get('/proxy/:port', async (req, res) => {
    const port = req.params.port;
    // TARGET_IP mora biti tvoj javni IP (onaj sa whatsmyip.org)
    // Možeš ga upisati direktno ovde umesto process.env.TARGET_IP ako ti je lakše
    const targetIp = process.env.TARGET_IP || "TVOJ_JAVNI_IP_OVDE"; 
    
    const ciljniURL = `http://${targetIp}:${port}`;
    
    try {
        const odgovor = await axios.get(ciljniURL, { timeout: 8000 });
        res.json(odgovor.data);
    } catch (greska) {
        res.status(500).json({ 
            greska: "Čvor nedostupan", 
            detalji: greska.message,
            pokusao_na: ciljniURL 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proksi radi na portu ${PORT}`));
