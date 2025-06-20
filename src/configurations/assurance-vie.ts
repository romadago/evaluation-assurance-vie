// Fichier : src/configurations/assurance-vie.ts

import { QuestionnaireConfig } from './types.js';

const questions: QuestionnaireConfig['questions'] = [
  {
    id: 'q1_retrait_avant_8_ans',
    question: "Peut-on retirer de l’argent d’un contrat d’assurance vie avant 8 ans ?",
    type: 'choix_unique',
    options: [
      { label: "A. Oui, mais cela entraîne toujours des pénalités importantes", value: "A", points: 0 },
      { label: "B. Oui, c’est possible, mais la fiscalité est moins avantageuse", value: "B", points: 1 },
      { label: "C. Non, il faut attendre 8 ans obligatoirement", value: "C", points: 0 },
    ],
  },
  {
    id: 'q2_support_garanti',
    question: "Quel est le type de support garanti en capital dans un contrat d’assurance vie ?",
    type: 'choix_unique',
    options: [
      { label: "A. Le fonds en euros", value: "A", points: 1 },
      { label: "B. Les unités de compte", value: "B", points: 0 },
      { label: "C. Les actions cotées", value: "C", points: 0 },
    ],
  },
  {
    id: 'q3_plusieurs_contrats',
    question: "Peut-on avoir plusieurs contrats d’assurance vie ?",
    type: 'choix_unique',
    options: [
      { label: "A. Non, la loi interdit de détenir plus d’un contrat", value: "A", points: 0 },
      { label: "B. Oui, mais seulement auprès du même assureur", value: "B", points: 0 },
      { label: "C. Oui, il est possible d’en avoir plusieurs chez différents assureurs", value: "C", points: 1 },
    ],
  },
  {
    id: 'q4_modif_beneficiaire',
    question: "Qui peut modifier la clause bénéficiaire dans un contrat d’assurance vie ?",
    type: 'choix_unique',
    options: [
      { label: "A. Le bénéficiaire uniquement", value: "A", points: 0 },
      { label: "B. L’assuré uniquement", value: "B", points: 2 },
      { label: "C. L’assureur, selon les performances du contrat", value: "C", points: 0 },
    ],
  },
  {
    id: 'q5_avantage_fiscal',
    question: "Après combien de temps votre assurance vie devient-elle plus avantageuse fiscalement ?",
    type: 'choix_unique',
    options: [
      { label: "A. Dès le lendemain de l’ouverture", value: "A", points: 0 },
      { label: "B. Après 8 ans de détention", value: "B", points: 1 },
      { label: "C. Jamais", value: "C", points: 0 },
    ],
  },
  {
    id: 'q6_unites_de_compte',
    question: "Dans un contrat d’assurance vie, que représentent les « unités de compte » ?",
    type: 'choix_unique',
    options: [
      { label: "A. Des produits garantis par l’État", value: "A", points: 0 },
      { label: "B. Des supports d’investissement à capital non garanti", value: "B", points: 2 },
      { label: "C. Une forme de devise propre à l’assurance", value: "C", points: 0 },
    ],
  },
  {
    id: 'q7_modif_clause_beneficiaire',
    question: "Peut-on modifier la clause bénéficiaire d’un contrat d’assurance vie ?",
    type: 'choix_unique',
    options: [
      { label: "A. Oui, à tout moment, tant qu’il n’y a pas eu d’acceptation du bénéficiaire", value: "A", points: 2 },
      { label: "B. Non, elle est irrévocable dès la signature du contrat", value: "B", points: 0 },
      { label: "C. Oui, mais uniquement avec l’accord de l’assureur", value: "C", points: 0 },
    ],
  },
  {
    id: 'q8_plafond_exoneration',
    question: "Quel est le plafond d’exonération (par bénéficiaire) sur les primes versées avant 70 ans ?",
    type: 'choix_unique',
    options: [
      { label: "A. 30 000 €", value: "A", points: 0 },
      { label: "B. 152 500 €", value: "B", points: 3 },
      { label: "C. 500 000 €", value: "C", points: 0 },
    ],
  },
];

const results = [
  {
    min: 0,
    max: 4,
    label: "Débutant",
    imageSrc: "/debutant.jpg",
    description: "Félicitations, vous avez posé la première brique ! Pour transformer cette curiosité en une stratégie solide, une présentation claire et sans jargon est souvent la meilleure étape. Prenons le temps d'y voir plus clair ensemble.",
  },
  {
    min: 5,
    max: 8,
    label: "Intermédiaire",
    imageSrc: "/intermediaire.jpg",
    description: "Excellent score ! Vous avez clairement de bonnes bases sur le fonctionnement de l'assurance-vie. Vous êtes à un tournant où l'on passe de la connaissance générale à la stratégie personnalisée. Ne laissez pas les détails techniques vous freiner, parlons-en pour affiner votre approche.",
  },
  {
    min: 9,
    max: 12,
    label: "Avancé",
    imageSrc: "/avance.jpg",
    description: "Bravo, votre maîtrise du sujet est impressionnante ! Vous comprenez non seulement le fonctionnement, mais aussi les opportunités et les limites de l'assurance-vie. Notre discussion portera sur l'optimisation fine de cet outil dans votre stratégie patrimoniale.",
  },
];

export const configAssuranceVie: QuestionnaireConfig = {
  id: 'assurance-vie',
  titre: 'Connaissez-vous vraiment bien l’assurance-vie ?',
  stockageId: 'reponses_assurance_vie',
  questions: questions,
  results: results,
};
