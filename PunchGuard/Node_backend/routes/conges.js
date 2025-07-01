const express = require('express');
const router = express.Router();
const pool = require('../init/connect');
require('dotenv').config();

const { envoyerEmailDemandeConge } = require('../Services/mailService');


router.post('/addConges', (req, res) => {
  const { employeId, dateDebut, dateFin, type } = req.body;

  if (!employeId || !dateDebut || !dateFin || !type) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const sql = `
    INSERT INTO conges (employeId, dateDebut, dateFin, type, dateDemande)
    VALUES (?, ?, ?, ?, CURDATE())
  `;

  pool.query(sql, [employeId, dateDebut, dateFin, type], async (err, result) => {
    if (err) {
      console.error('[Erreur MySQL]', err);
      return res.status(500).json({ message: 'Erreur serveur lors de l\'ajout du congé' });
    }
      //  Envoi de l'e-mail à l'admin
    try {
      const id = result.insertId;

      await envoyerEmailDemandeConge({ employeId, dateDebut, dateFin, type,id  });
    } catch (emailErr) {
      console.error('[Erreur email]', emailErr);
      // on peut  continuer même si l'email échoue
    }

    return res.status(201).json({ message: ' Demande de congé enregistrée avec succès' });
  });
});


router.get('/ListeConges/:id', (req, res) => {
  const employeId = req.params.id; 
  const sql = `
    SELECT
      id,
      employeId,
      dateDebut,
      dateFin,
      type,
      statut,
      dateDemande,
      DATEDIFF(dateFin, dateDebut) + 1 AS nombreJours
    FROM conges
    WHERE employeId = ?
    ORDER BY dateDebut DESC
  `;

  pool.query(sql, [parseInt(employeId)], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des congés :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    res.json(results);
  });
});


router.get('/accepter/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.promise().query('UPDATE conges SET statut = ? WHERE id = ?', ['accepté', id]);
    res.send(' La demande de congé a été acceptée.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur.');
  }
});

router.get('/refuser/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.promise().query('UPDATE conges SET statut = ? WHERE id = ?', ['refusé', id]);
    res.send(' La demande de congé a été refusée.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur.');
  }
});






module.exports = router;


