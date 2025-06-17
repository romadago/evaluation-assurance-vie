// Fichier : src/configurations/types.ts

// On réintroduit les "points" dans les options.
export interface Option {
  label: string;
  value: string;
  points: number; 
}

// La question n'a plus besoin de logique conditionnelle 'showIf'
export interface Question {
  id: string; 
  question: string;
  type: 'choix_unique' | 'choix_multiple'; // Pour le scoring, on se concentre sur les choix
  options: Option[];
}

// Les résultats sont à nouveau basés sur un score min/max
export interface Result {
    min: number;
    max: number;
    label: string;
    description: string;
    imageSrc: string;
}

// La configuration globale du questionnaire
export interface QuestionnaireConfig {
  id: string;
  titre: string;
  stockageId: string;
  questions: Question[];
  results: Result[];
}