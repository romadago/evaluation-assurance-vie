// Fichier : src/configurations/PER.ts

import { QuestionnaireConfig } from './types.js';

// --- DÉFINITION DES DONNÉES POUR LE QUESTIONNAIRE PER ---

const questions = [
  {
    question: "Quelle est la principale caractéristique d'un PER (Plan d'Épargne Retraite) ?",
    options: [
      { label: "A. Les fonds sont disponibles à tout moment sans condition", value: "A", points: 0 },
      { label: "B. L'épargne est bloquée jusqu'à la retraite (sauf cas exceptionnels)", value: "B", points: 1 },
      { label: "C. Il est exclusivement investi en actions", value: "C", points: 0 },
    ],
  },
  {
    question: "Quel est l'avantage fiscal majeur des versements sur un PER ?",
    options: [
      { label: "A. Ils génèrent un crédit d'impôt de 50%", value: "A", points: 0 },
      { label: "B. Ils sont déductibles du revenu imposable", value: "B", points: 2 },
      { label: "C. Il n'y a aucun avantage fiscal à l'entrée", value: "C", points: 0 },
    ],
  },
  {
    question: "À la retraite, comment peut-on récupérer l'argent d'un PER ?",
    options: [
      { label: "A. Uniquement sous forme de capital", value: "A", points: 0 },
      { label: "B. Uniquement sous forme de rente viagère", value: "B", points: 0 },
      { label: "C. Au choix : en capital, en rente, ou un mélange des deux", value: "C", points: 2 },
    ],
  },
  // Ajoutez d'autres questions si vous le souhaitez...
];

const results = [
  {
    min: 0,
    max: 1,
    label: "Débutant",
    imageSrc: "/debutant.jpg",
    description: "Vous commencez à explorer le PER. C'est un excellent outil de préparation à la retraite, et comprendre ses bases est la première étape pour bien l'utiliser. Discutons de vos objectifs pour voir comment il peut s'adapter à votre situation.",
  },
  {
    min: 2,
    max: 3,
    label: "Intermédiaire",
    imageSrc: "/intermediaire.jpg",
    description: "Vous avez bien saisi les concepts clés du PER, notamment son mécanisme et son avantage fiscal. Il est maintenant temps d'aborder les stratégies d'investissement et d'optimisation pour en tirer le meilleur parti.",
  },
  {
    min: 4,
    max: 5,
    label: "Avancé",
    imageSrc: "/avance.jpg",
    description: "Félicitations, vous maîtrisez le fonctionnement du PER ! Vous êtes prêt à discuter de son rôle précis dans votre stratégie patrimoniale globale, en l'articulant avec vos autres placements pour une retraite sereine et optimisée.",
  },
];


// --- L'OBJET DE CONFIGURATION FINAL ---

export const configPER: QuestionnaireConfig = {
  id: 'per',
  titre: 'Maîtrisez-vous le Plan d\'Épargne Retraite (PER) ?',
  stockageId: 'reponses_per_TEST', // Nouvel identifiant pour la base de données
  questions: questions,
  results: results,
};
