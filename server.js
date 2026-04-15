
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// TVOJA STATIČKA ADRESA (ovde upiši tvoj pravi statički IP)
const STATIC_IP = "185.103.136.132"; 

app.get('/proxy/:port', async (req, res) => {
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
