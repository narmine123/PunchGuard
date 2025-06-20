require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const employeRoutes = require('./routes/employe.routes');
const pool = require('./init/connect');
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/employes', employeRoutes);
app.use(express.json());

// Gestion des erreurs centralisée
app.use((err, req, res, next) => {
    console.log(' Requête entrante:', req.method, req.url);

  console.error('Erreur:', err.stack);
  res.status(500).json({ error: 'Erreur interne' });
});

app.post('/test', (req, res) => {
  console.log(' Route /test atteinte');
  console.log('Données reçues:', req.body);
  res.json({ message: 'Mot de passe bien reçu' });
});
// Démarrage
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});