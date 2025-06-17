// Fichier : src/configurations/PER.ts

import { QuestionnaireConfig } from './types.js';

// --- DÉFINITION DES DONNÉES POUR LE QUESTIONNAIRE PER ---

const questions = [
  {
    question: "Le Plan d’Épargne Retraite permet :",
    options: [
      { label: "A. De financer un achat immobilier à tout moment", value: "A", points: 0 },
      { label: "B. De constituer une épargne en vue de la retraite", value: "B", points: 1 },
      { label: "C. De garantir un taux d’intérêt fixe à vie", value: "C", points: 0 },
    ],
  },
  {
    question: "Les versements volontaires sur un PER sont :",
    options: [
      { label: "A. Fiscalement déductibles dans certaines limites", value: "A", points: 2 },
      { label: "B. Toujours exonérés d’impôt à 100 %", value: "B", points: 0 },
      { label: "C. Imposés comme des revenus du travail", value: "C", points: 0 },
    ],
  },
  {
    question: "Peut-on débloquer son PER avant la retraite ?",
    options: [
      { label: "A. Non, c’est impossible", value: "A", points: 0 },
      { label: "B. Oui, uniquement en cas de licenciement ou invalidité", value: "B", points: 0 },
      { label: "C. Oui, dans certains cas spécifiques comme l’achat de la résidence principale", value: "C", points: 2 },
    ],
  },
  {
    question: "Quelle est la forme de sortie par défaut d’un PER à la retraite ?",
    options: [
      { label: "A. En rente viagère uniquement", value: "A", points: 0 },
      { label: "B. En capital uniquement", value: "B", points: 0 },
      { label: "C. Au choix entre capital, rente ou mixte", value: "C", points: 2 },
    ],
  },
  {
    question: "Un PER peut être alimenté par :",
    options: [
      { label: "A. Des versements volontaires, des sommes issues de l’épargne salariale, ou de l’épargne retraite collective", value: "A", points: 2 },
      { label: "B. Uniquement par des primes employeur", value: "B", points: 0 },
      { label: "C. Uniquement par les cotisations obligatoires", value: "C", points: 0 },
    ],
  },
  {
    question: "Quel est l’intérêt fiscal principal du PER pour un contribuable imposé dans la tranche à 41 % ?",
    options: [
      { label: "A. Aucun, car le PER est réservé aux non-imposables", value: "A", points: 0 },
      { label: "B. Il permet de réduire son impôt sur le revenu en déduisant les versements", value: "B", points: 2 },
      { label: "C. Il permet d’augmenter la retraite de base de la Sécurité sociale", value: "C", points: 0 },
    ],
  },
  {
    question: "À quel âge peut-on normalement débloquer les fonds d’un PER ?",
    options: [
      { label: "A. À 55 ans", value: "A", points: 0 },
      { label: "B. À l’âge légal de départ à la retraite", value: "B", points: 1 },
      { label: "C. Dès que l’on quitte son emploi", value: "C", points: 0 },
    ],
  },
  {
    question: "Les sommes issues d’un ancien contrat Madelin peuvent-elles être transférées sur un PER ?",
    options: [
      { label: "A. Non, c’est impossible", value: "A", points: 0 },
      { label: "B. Oui, mais uniquement après 70 ans", value: "B", points: 0 },
      { label: "C. Oui, le PER est justement conçu pour regrouper différents produits retraite", value: "C", points: 3 },
    ],
  },
  {
    question: "En cas de décès avant la retraite, que devient l’épargne du PER ?",
    options: [
      { label: "A. Elle est perdue", value: "A", points: 0 },
      { label: "B. Elle est transmise au(x) bénéficiaire(s) désigné(s)", value: "B", points: 2 },
      { label: "C. Elle est intégrée automatiquement dans la succession", value: "C", points: 0 },
    ],
  },
  {
    question: "En phase de rente, les revenus issus d’un PER sont :",
    options: [
      { label: "A. Non imposables", value: "A", points: 0 },
      { label: "B. Imposés selon le régime des pensions de retraite", value: "B", points: 3 },
      { label: "C. Imposés comme des dividendes", value: "C", points: 0 },
    ],
  },
];

const results = [
  {
    min: 0,
    max: 7,
    label: "Débutant",
    imageSrc: "/debutant.jpg",
    description: "Vous connaissez le PER de nom, mais de nombreuses notions restent à découvrir.",
  },
  {
    min: 8,
    max: 14,
    label: "Intermédiaire",
    imageSrc: "/intermediaire.jpg",
    description: "Vous maîtrisez les bases et certaines subtilités, mais la fiscalité et les cas particuliers méritent d’être approfondis.",
  },
  {
    min: 15,
    max: 20,
    label: "Avancé",
    imageSrc: "/avance.jpg",
    description: "Vous comprenez les leviers fiscaux, les cas de déblocage et les options de sortie. Vous êtes prêt à l’utiliser efficacement dans une stratégie patrimoniale.",
  },
];


// --- L'OBJET DE CONFIGURATION FINAL ---

export const configPER: QuestionnaireConfig = {
  id: 'per',
  titre: 'Maîtrisez-vous le Plan d\'Épargne Retraite (PER) ?',
  stockageId: 'reponses_per_TEST',
  questions: questions,
  results: results,
};

