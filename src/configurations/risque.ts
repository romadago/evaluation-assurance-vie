// Fichier : src/configurations/risque.ts

import { QuestionnaireConfig, Question } from './types.js';

// J'ai transcrit les premières questions de votre PDF.
// Vous devrez continuer à ajouter les autres questions ici en suivant ce modèle.
const questions: Question[] = [
  // --- Situation personnelle ---
  {
    id: 'q1_date_naissance',
    question: "Date de naissance:",
    type: 'date',
  },
  {
    id: 'q2_foyer_fiscal',
    question: "Personnes composant votre foyer fiscal (vous comprenant):",
    type: 'nombre',
    placeholder: 'Ex: 2'
  },
  {
    id: 'q3_personnes_a_charge',
    question: "Combien de personnes avez-vous à charge en plus de votre foyer fiscal (comptez une demie-personne par enfant en garde alternée):",
    type: 'nombre',
    placeholder: 'Ex: 1.5'
  },
  {
    id: 'q4_depart_retraite',
    question: "Année de départ à la retraite :",
    type: 'choix_unique',
    options: [
      { label: "Je suis déjà retraité(e)", value: "deja_retraite" },
      { label: "Dans moins de 5 ans", value: "moins_de_5_ans" },
      { label: "Dans plus de 5 ans", value: "plus_de_5_ans" },
    ],
  },
  // --- Expérience financière (Exemple de logique conditionnelle) ---
  {
    id: 'q17_deja_investi_actions',
    question: "Avez-vous déjà investi dans des actions (détenues en direct)?",
    type: 'choix_unique',
    options: [
      { label: "Oui", value: "oui" },
      { label: "Non", value: "non" },
    ],
  },
  {
    id: 'q17a_nombre_operations_actions',
    question: "Nombre d'opérations réalisées dans ce type d'investissement:",
    type: 'choix_unique',
    // Cette question ne s'affiche que si l'utilisateur a répondu "oui" à la précédente
    showIf: {
      questionId: 'q17_deja_investi_actions',
      value: 'oui'
    },
    options: [
      { label: "Une fois", value: "une_fois" },
      { label: "Entre 2 et 10 fois", value: "2_10_fois" },
      { label: "Plus de 10 fois", value: "plus_de_10_fois" },
    ],
  },
];

// CORRECTION ICI : Le mot "export" est crucial pour que le fichier soit un module valide.
export const configRisque: QuestionnaireConfig = {
  id: 'questionnaire-risque',
  titre: 'Questionnaire de Risque',
  stockageId: 'reponses_risque_profil',
  questions: questions,
  results: [], // Pour ce questionnaire, le résultat est la collecte des données
};

