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


/*router.get('/pointages', (req, res) => {
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
});*/

/*router.post('/pointage', (req, res) => {
  const { employe_id, date, heure } = req.body;

  // Vérifier que toutes les valeurs sont bien fournies
  if (!employe_id || !date || !heure) {
    return res.status(400).json({ message: 'Champs requis manquants', payload: { employe_id, date, heure } });
  }

  // Vérifier si un pointage existe déjà pour aujourd'hui
  const checkSql = 'SELECT * FROM pointages WHERE employe_id = ? AND date = ?';
  pool.query(checkSql, [employe_id, date], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur vérification', err });

    if (results.length === 0) {
      // 👇 Aucun pointage → insérer comme heure d’entrée
      const insertSql = 'INSERT INTO pointages (employe_id, date, heure_entree) VALUES (?, ?, ?)';
      pool.query(insertSql, [employe_id, date, heure], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur insertion', err });
        res.json({ message: ' Heure d’entrée enregistrée avec succès' });
      });
    } else {
      // 👇 Pointage déjà existant → mettre à jour heure de sortie
      const updateSql = 'UPDATE pointages SET heure_sortie = ? WHERE employe_id = ? AND date = ?';
      pool.query(updateSql, [heure, employe_id, date], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur mise à jour', err });
        res.json({ message: 'Heure de sortie mise à jour avec succès' });
      });
    }
  });
});


*/
router.post('/ping', (req, res) => {
  const { employeId } = req.body;
  const now = new Date();
  const date = now.toISOString().slice(0, 10); // yyyy-mm-dd
  const heure = now.toTimeString().slice(0, 8); // hh:mm:ss

  if (!employeId) {
    return res.status(400).json({ message: 'employeId requis' });
  }

  const check = `SELECT * FROM pointages WHERE employe_id = ? AND date = ?`;

  pool.query(check, [employeId, date], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur SQL' });

    if (results.length > 0) {
      const update = `UPDATE pointages SET heure_sortie = ? WHERE employe_id = ? AND date = ?`;
      pool.query(update, [heure, employeId, date], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur update' });
        res.json({ message: 'Heure de sortie mise à jour.' });
      });
    } else {
      const insert = `INSERT INTO pointages (employe_id, date, heure_entree) VALUES (?, ?, ?)`;
      pool.query(insert, [employeId, date, heure], (err) => {
        if (err) return res.status(500).json({ message: 'Erreur insert' });
        res.json({ message: 'Heure d’entrée enregistrée.' });
      });
    }
  });
});



// Route GET corrigée
router.get('/pointages/:id', (req, res) => {
  const id = req.params.id;
  
  // Validation simple de l'ID
  if (isNaN(id)) {
    return res.status(400).json({ error: "L'ID doit être un nombre" });
  }

  pool.query('SELECT * FROM pointages WHERE employe_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur MySQL:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Aucun pointage trouvé' });
    }
    
    res.json(results);
  });
});



module.exports = router;


