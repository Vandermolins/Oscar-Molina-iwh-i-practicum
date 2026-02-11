const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

dotenv.config(); // para usar variables de entorno
const PRIVATE_APP_ACCESS = process.env.HUBSPOT_TOKEN;

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTE 1 - Homepage: mostrar contactos
app.get('/', async (req, res) => {
    const url = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const resp = await axios.get(url, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'HubSpot Contacts', data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener contactos');
    }
});

// ROUTE 2 - Formulario
app.get('/form', (req, res) => {
    res.render('form', { title: 'Crear/Actualizar Contacto' });
});

// ROUTE 3 - POST: crear contacto
app.post('/form', async (req, res) => {
    const { email, firstname, lastname } = req.body;

    const newContact = {
        properties: { email, firstname, lastname }
    };

    const url = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(url, newContact, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear contacto');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
