// Fichier : netlify/functions/send-results.js

// Pour utiliser la syntaxe "import", vous devez vous assurer que votre package.json contient "type": "module"
// Sinon, utilisez const { Resend } = require('resend');
import { Resend } from 'resend';

// La fonction principale qui sera exécutée par Netlify
export async function handler(event) {
  // On s'assure que la requête vient bien du front-end via une méthode POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // On initialise Resend avec la clé API.
    // C'est la manière sécurisée de gérer les clés secrètes : elles sont stockées
    // en tant que variables d'environnement sur le site de Netlify, pas dans le code.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // On récupère les données envoyées par le composant React
    const data = JSON.parse(event.body);
    const { email, quizTitle, score, maxScore, resultLabel, resultDescription } = data;

    // Une petite validation pour s'assurer que toutes les données sont bien là
    if (!email || !quizTitle || !resultLabel || !resultDescription) {
      return { statusCode: 400, body: 'Données manquantes pour l'envoi de l'email.' };
    }

    // --- Envoi de l'email via Resend ---
    await resend.emails.send({
      // IMPORTANT : Doit être une adresse de votre domaine vérifié sur Resend
      from: 'Aeternia Patrimoine <noreply@aeterniapatrimoine.fr>', 
      to: [email], // L'adresse email de l'utilisateur
      subject: `Vos résultats au questionnaire : ${quizTitle}`,
      // Le corps de l'email, en HTML pour une belle mise en forme
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Bonjour !</h2>
          <p>Merci d'avoir participé à notre questionnaire "<strong>${quizTitle}</strong>".</p>
          <p>Voici votre résultat :</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">${resultLabel} (${score}/${maxScore} points)</h3>
            <p><em>${resultDescription}</em></p>
          </div>
          <p>N'hésitez pas à prendre rendez-vous pour discuter de vos résultats et affiner votre stratégie.</p>
          <p>Cordialement,</p>
          <p><strong>L'équipe Aeternia Patrimoine</strong></p>
        </div>
      `,
    });

    // On retourne une réponse de succès au front-end
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès !' }),
    };

  } catch (error) {
    console.error("Erreur dans la fonction Netlify :", error);
    // En cas d'erreur, on retourne une réponse d'erreur au front-end
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Une erreur est survenue lors de l'envoi de l'email." }),
    };
  }
}
