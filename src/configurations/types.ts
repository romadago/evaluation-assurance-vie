// Fichier : src/configurations/types.ts

// Chaque option a des points
export interface Option {
  label: string;
  value: string;
  points: number; 
}

// Chaque question a un ID et des options avec des points
export interface Question {
  id: string; 
  question: string;
  type: 'choix_unique' | 'choix_multiple';
  options: Option[];
}

// Chaque résultat a une tranche de score (min/max)
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
