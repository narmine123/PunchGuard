const connection = require('./connect');

const createEmployeTable = `
  CREATE TABLE IF NOT EXISTS employe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    poste VARCHAR(100),
    mot_de_passe VARCHAR(255)
  )
`;

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion :', err.message);
    return;
  }

  connection.query(createEmployeTable, (err, result) => {
    if (err) {
      console.error("Erreur lors de la création :", err.message);
    } else {
      console.log("Table employe créée avec succès !");
    }
    connection.end();
  });
});