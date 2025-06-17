// Fichier : src/configurations/risque.ts

import { QuestionnaireConfig, Question } from './types.js';

const questions: Question[] = [
    // --- Situation ---
    {
        id: 'q4_retraite',
        question: "Quand prévoyez-vous de partir à la retraite ?",
        type: 'choix_unique',
        options: [
            { label: "Je suis déjà retraité(e)", value: "a", points: 0 },
            { label: "Dans moins de 5 ans", value: "b", points: 1 },
            { label: "Dans plus de 5 ans", value: "c", points: 2 },
        ],
    },
    {
        id: 'q5_revenus',
        question: "Quels sont les revenus nets annuels de votre foyer ?",
        type: 'choix_unique',
        options: [
            { label: "Inférieur à 25 000 €", value: "a", points: 0 },
            { label: "Entre 25 000 et 50 000 €", value: "b", points: 1 },
            { label: "Entre 50 000 et 100 000 €", value: "c", points: 2 },
            { label: "Au-delà de 100 000 €", value: "d", points: 3 },
        ],
    },
    {
        id: 'q6_epargne_mensuelle',
        question: "Combien pouvez-vous épargner chaque mois ?",
        type: 'choix_unique',
        options: [
            { label: "Je n'épargne pas", value: "a", points: 0 },
            { label: "De 0 à 500 €", value: "b", points: 1 },
            { label: "De 500 à 1 000 €", value: "c", points: 2 },
            { label: "Plus de 1 000 €", value: "d", points: 3 },
        ],
    },
     // --- Connaissance & Expérience ---
    {
        id: 'q17_experience_actions',
        question: "Avez-vous déjà investi dans des actions (détenues en direct) ?",
        type: 'choix_unique',
        options: [
            { label: "Non", value: "non", points: 0 },
            { label: "Oui, une fois", value: "oui_1", points: 1 },
            { label: "Oui, plusieurs fois", value: "oui_plusieurs", points: 2 },
        ],
    },
    {
        id: 'q25_connaissance_rendement',
        question: "Pour espérer avoir un rendement élevé, il faut accepter de pouvoir perdre de l'argent.",
        type: 'choix_unique',
        options: [
            { label: "Vrai", value: "vrai", points: 2 },
            { label: "Faux", value: "faux", points: 0 },
            { label: "Je ne sais pas", value: "nsp", points: 0 },
        ],
    },
    {
        id: 'q27_connaissance_diversification',
        question: "Un portefeuille diversifié est généralement moins risqué qu'un portefeuille concentré sur un seul produit.",
        type: 'choix_unique',
        options: [
            { label: "Vrai", value: "vrai", points: 2 },
            { label: "Faux", value: "faux", points: 0 },
            { label: "Je ne sais pas", value: "nsp", points: 0 },
        ],
    },
    {
        id: 'q28_connaissance_action_pret',
        question: "Quand je détiens une action d'une société, je lui prête de l'argent.",
        type: 'choix_unique',
        options: [
            { label: "Vrai", value: "vrai", points: 0 },
            { label: "Faux", value: "faux", points: 1 },
            { label: "Je ne sais pas", value: "nsp", points: 0 },
        ],
    },
     {
        id: 'q32_connaissance_opcvm',
        question: "Les OPCVM investis en actions sont généralement plus risqués que les OPCVM investis en obligations.",
        type: 'choix_unique',
        options: [
            { label: "Vrai", value: "vrai", points: 1 },
            { label: "Faux", value: "faux", points: 0 },
            { label: "Je ne sais pas", value: "nsp", points: 0 },
        ],
    },
    {
        id: 'q34_connaissance_volatilite',
        question: "La volatilité d'un fonds est un bon indicateur de son niveau de risque.",
        type: 'choix_unique',
        options: [
            { label: "Vrai", value: "vrai", points: 2 },
            { label: "Faux", value: "faux", points: 0 },
            { label: "Je ne sais pas", value: "nsp", points: 0 },
        ],
    },
     // --- Tolérance au risque ---
    {
        id: 'q42_reaction_perte',
        question: "Vous avez investi dans un produit qui vient de perdre 20% en trois mois. Quelle est votre réaction ?",
        type: 'choix_unique',
        options: [
            { label: "Je vends, j'ai déjà trop attendu.", value: "a", points: 0 },
            { label: "J'attends un peu mais si cela ne s'améliore pas, j'agis.", value: "b", points: 1 },
            { label: "Pas de problème, j'attends. Tant que je n'ai pas vendu, je n'ai pas perdu !", value: "c", points: 2 },
            { label: "J'augmente mon investissement. À ce prix là, c'est cadeau !", value: "d", points: 3 },
        ],
    },
    {
        id: 'q44_attente_rebond',
        question: "La valeur de votre portefeuille a beaucoup baissé, combien de temps êtes-vous disposé(e) à attendre avant qu'il ne revienne à sa valeur initiale ?",
        type: 'choix_unique',
        options: [
            { label: "Moins de 6 mois", value: "a", points: 0 },
            { label: "De 6 mois à 1 an", value: "b", points: 1 },
            { label: "De 1 an à 2 ans", value: "c", points: 2 },
            { label: "Plus de 2 ans", value: "d", points: 3 },
        ],
    },
    {
        id: 'q46_choix_investissement',
        question: "On vous propose 5 investissements. Lequel choisissez-vous ?",
        type: 'choix_unique',
        options: [
            { label: "Pire résultat : +5% / Meilleur résultat : +10%", value: "a", points: 0 },
            { label: "Pire résultat : 0% / Meilleur résultat : +20%", value: "b", points: 1 },
            { label: "Pire résultat : -10% / Meilleur résultat : +50%", value: "c", points: 2 },
            { label: "Pire résultat : -25% / Meilleur résultat : +90%", value: "d", points: 3 },
            { label: "Pire résultat : -50% / Meilleur résultat : +200%", value: "e", points: 4 },
        ],
    },
];

const results = [
    {
        min: 0,
        max: 10,
        label: "Profil Prudent",
        imageSrc: "/prudent.jpg",
        description: "Votre profil privilégie la sécurité et la préservation du capital. Les solutions à faible risque, même avec un rendement modéré, sont les plus adaptées à vos objectifs."
    },
    {
        min: 11,
        max: 20,
        label: "Profil Équilibré",
        imageSrc: "/equilibre.jpg",
        description: "Vous recherchez un bon compromis entre la sécurité et la performance. Un portefeuille diversifié, alliant des actifs garantis et une part d'actifs plus dynamiques, correspond à votre approche."
    },
    {
        min: 21,
        max: 28, // Score maximum possible avec cette sélection de questions
        label: "Profil Dynamique",
        imageSrc: "/dynamique.jpg",
        description: "Vous êtes prêt à accepter une part de risque plus importante pour viser un rendement potentiellement plus élevé. Votre horizon de temps et votre connaissance des marchés vous permettent d'envisager des placements plus offensifs."
    }
];

export const configRisque: QuestionnaireConfig = {
    id: 'questionnaire-risque',
    titre: 'Définissez votre Profil de Risque',
    stockageId: 'reponses_profil_risque',
    questions: questions,
    results: results,
};