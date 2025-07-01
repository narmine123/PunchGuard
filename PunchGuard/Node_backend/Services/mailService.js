const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function envoyerEmailDemandeConge({ employeId, dateDebut, dateFin, type, id }) {
  const html = `
    <p>Bonjour Directeur,</p>
    <p>Un employé (ID: <strong>${employeId}</strong>) a demandé un congé :</p>
    <ul>
      <li><strong>Type :</strong> ${type}</li>
      <li><strong>Du :</strong> ${dateDebut}</li>
      <li><strong>Au :</strong> ${dateFin}</li>
    </ul>
    <p>Merci de choisir une action :</p>
    <a href="http://localhost:3000/api/conges/accepter/${id}" style="padding:10px 20px; background-color:green; color:white; text-decoration:none; border-radius:5px;">✅ Accepter</a>
    <a href="http://localhost:3000/api/conges/refuser/${id}" style="padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px; margin-left:10px;">❌ Refuser</a>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'narmine.haddad@etudiant-fst.utm.tn',
    subject: `Nouvelle demande de congé - Employé #${employeId}`,
    text: `Un employé (ID: ${employeId}) a demandé un congé de type "${type}" du ${dateDebut} au ${dateFin}.`,
    html: html // 🔴 Ceci est essentiel pour afficher les boutons dans l’email
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { envoyerEmailDemandeConge };
