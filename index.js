const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo.
const PRIVATE_APP_ACCESS = '';


// =====================================================
// ROUTE 1 - Homepage (using your Postman JSON response)
// =====================================================
app.get('/', (req, res) => {

    // Simulated HubSpot response (based on your Postman result)
    const hubspotResponse = {
        results: [
            {
                id: "201478040975",
                properties: {
                    createdate: "2026-02-11T20:15:05.647Z",
                    email: "superuser@nintendo.com",
                    firstname: "Shigeru",
                    hs_object_id: "201478040975",
                    lastmodifieddate: "2026-02-11T20:15:17.662Z",
                    lastname: "Miyamoto"
                },
                createdAt: "2026-02-11T20:15:05.647Z",
                updatedAt: "2026-02-11T20:15:17.662Z",
                archived: false,
                url: "https://app.hubspot.com/contacts/50966491/record/0-1/201478040975"
            },
            {
                id: "201478096564",
                properties: {
                    createdate: "2026-02-11T19:22:23.241Z",
                    email: "demand@nintendo.com",
                    firstname: "Mario ",
                    hs_object_id: "201478096564",
                    lastmodifieddate: "2026-02-11T19:35:26.741Z",
                    lastname: "Castaneda"
                },
                createdAt: "2026-02-11T19:22:23.241Z",
                updatedAt: "2026-02-11T19:35:26.741Z",
                archived: false,
                url: "https://app.hubspot.com/contacts/50966491/record/0-1/201478096564"
            },
            {
                id: "201504513327",
                properties: {
                    createdate: "2026-02-11T20:16:22.471Z",
                    email: "redaction@xbox.com",
                    firstname: "Phill ",
                    hs_object_id: "201504513327",
                    lastmodifieddate: "2026-02-11T20:16:45.067Z",
                    lastname: "Spencer"
                },
                createdAt: "2026-02-11T20:16:22.471Z",
                updatedAt: "2026-02-11T20:16:45.067Z",
                archived: false,
                url: "https://app.hubspot.com/contacts/50966491/record/0-1/201504513327"
            }
        ]
    };

    // Transform data for front-end
    const data = hubspotResponse.results.map(contact => ({
        id: contact.id,
        fullName: `${contact.properties.firstname.trim()} ${contact.properties.lastname.trim()}`,
        email: contact.properties.email,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
        url: contact.url
    }));

    res.render('homepage', {
        title: 'Contacts | HubSpot APIs',
        data
    });
});


// =====================================================
// ROUTE 2 - Render Form
// =====================================================
app.get('/form', (req, res) => {
    res.render('form', {
        title: 'Create or Update Contact'
    });
});


// =====================================================
// ROUTE 3 - Simulated Create / Update
// =====================================================
app.post('/form', (req, res) => {

    const newContact = {
        properties: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }
    };

    console.log('New contact received from form:');
    console.log(newContact);

    // Aquí iría axios.post(...) si fuera real
    // Pero estamos usando datos simulados

    res.redirect('/');
});


// =====================================================
// Localhost
// =====================================================
app.listen(3000, () => 
    console.log('Listening on http://localhost:3000')
);
