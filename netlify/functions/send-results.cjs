// Fichier : netlify/functions/send-results.cjs

const { Resend } = require('resend');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = JSON.parse(event.body);
    const { email, quizTitle, score, maxScore, resultLabel, resultDescription, fullAnswers } = data;

    // --- Génération du tableau HTML des réponses ---
    let answersHtml = '';
    if (fullAnswers && fullAnswers.length > 0) {
      answersHtml = `
        <h3 style="color: #333;">Vos réponses en détail :</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #eee;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Question</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Votre réponse</th>
            </tr>
          </thead>
          <tbody>
            ${fullAnswers.map(item => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.question}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.answer}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // --- Envoi de l'email ---
    await resend.emails.send({
      from: 'Aeternia Patrimoine <contact@aeterniapatrimoine.fr>', // <-- ADRESSE MISE À JOUR ICI
      to: [email], // Envoi au prospect
      bcc: ['VOTRE_EMAIL_ADMIN@exemple.com'], // IMPORTANT: Mettez votre propre email ici pour recevoir une copie
      subject: `Vos résultats au questionnaire : ${quizTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Bonjour !</h2>
          <p>Merci d'avoir participé à notre questionnaire "<strong>${quizTitle}</strong>".</p>
          <p>Voici votre profil d'investisseur :</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0056b3;">${resultLabel} (${score}/${maxScore} points)</h3>
            <p><em>${resultDescription}</em></p>
          </div>
          <br>
          ${answersHtml}
          <br>
          <p>N'hésitez pas à prendre rendez-vous pour discuter de vos résultats et affiner votre stratégie.</p>
          <p>Cordialement,</p>
          <p><strong>L'équipe Aeternia Patrimoine</strong></p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès !' }),
    };

  } catch (error) {
    console.error("Erreur dans la fonction Netlify :", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Une erreur est survenue lors de l'envoi de l'email." }),
    };
  }
};