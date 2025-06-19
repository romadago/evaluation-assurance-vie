// Fichier : src/configurations/types.ts
export interface Option {
  label: string;
  value: string;
  points: number; 
}

export interface Question {
  id: string; 
  question: string;
  type: 'choix_unique' | 'choix_multiple';
  options: Option[];
}

export interface Result {
    min: number;
    max: number;
    label: string;
    description: string;
    imageSrc: string;
}

export interface QuestionnaireConfig {
  id: string;
  titre: string;
  stockageId: string;
  questions: Question[];
  results: Result[];
}