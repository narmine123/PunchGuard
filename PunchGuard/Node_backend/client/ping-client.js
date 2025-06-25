/*const axios = require('axios');
const fs = require('fs');

// Lire ID depuis un fichier config
const employeId = fs.readFileSync('config.txt', 'utf-8').trim();

function envoyerPing() {
  axios.post('http://localhost:3000/api/employes/ping', { employeId })
    .then(res => console.log(`[${new Date().toLocaleTimeString()}] ${res.data.message}`))
    .catch(err => console.error('Erreur de pointage :', err.message));
}

// Ping toutes les 5 minutes
setInterval(envoyerPing, 5 * 60 * 1000);
envoyerPing(); // ping initial
*/