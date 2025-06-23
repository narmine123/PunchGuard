const express = require('express');
const router = express.Router();
const pool = require('../init/connect');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/ListeEmploye', (req, res) => {
  pool.query('SELECT * FROM employe', (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

router.get('/ListeEmploye/:id' , (req,res) => {
  const {id} = req.params;
  pool.query('select * from employe where id=?', [id], (err,results) => {
    if (err) return res.status(500).json({error:' Erreur SQL'});
    if (results.length === 0) return res.status(404).json({ error: 'Employé introuvable' });
    res.json(results[0]);
  });
});

router.post('/AddEmploye', (req, res) => {
  const { nom, prenom, email, poste, mot_de_passe } = req.body;

  console.log('Requête reçue :', req.body); // Debug

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }
  pool.query(
    'INSERT INTO employe (nom, prenom, email, poste, mot_de_passe) VALUES (?, ?, ?, ?, ?)',
    [nom, prenom, email, poste, mot_de_passe],
    (err, result) => {
      if (err) {
        console.error('Erreur SQL:', err);

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Email déjà utilisé' });
        }

        return res.status(500).json({ error: 'Erreur serveur' });
      }

      res.status(201).json({ message: 'Employé ajouté', id: result.insertId });
    }
  );
});


router.put('/UpdateEmploye/:id', (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, poste } = req.body;

  pool.query(
    'UPDATE employe SET nom=?, prenom=?, email=?, poste=? WHERE id=?',
    [nom, prenom, email, poste, id],
    (err, result) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ error: 'Erreur de mise à jour' });
      }
      res.json({ message: 'Employé mis à jour', affectedRows: result.affectedRows });
    }
  );
});



router.delete('/DeleteEmploye/:id', (req, res) => {
  const employeeId = req.params.id;

  // 1. Vérification que l'ID est valide
  if (!employeeId || isNaN(employeeId)) {
    return res.status(400).json({
      success: false,
      error: 'ID employé invalide'
    });
  }
  pool.query(
    'DELETE FROM employe WHERE id = ?',
    [employeeId],
    (err, result) => {
      if (err) {
        console.error('Erreur SQL:', {
          message: err.message,
          code: err.code,
          sql: err.sql
        });
        return res.status(500).json({
          success: false,
          error: 'Erreur lors de la suppression',
          details: err.message
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Aucun employé trouvé avec cet ID'
        });
      }

      res.json({
        success: true,
        message: 'Employé supprimé définitivement',
        deletedId: employeeId
      });
    }
  );
});



router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log(' Requête login:', req.body.email);

  const sql = 'SELECT * FROM employe WHERE email = ?';
  pool.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email invalide' });
    }

    const user = results[0];

    if (!password || !user.mot_de_passe) {
      return res.status(400).json({ message: 'Mot de passe manquant' });
    }

    /*const match = await bcrypt.compare(password, user.mot_de_passe);

    if (!match) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }*/

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    res.json({ message: 'Connexion réussie', token });
  });
});


router.get('/pointages', (req, res) => {
  pool.query('SELECT * FROM pointages', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


router.get('/pointages/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM pointages WHERE employe_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


module.exports = router;


