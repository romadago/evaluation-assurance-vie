// Fichier : src/configurations/types.ts (Mis à jour pour le questionnaire de risque)

// Les options n'ont plus besoin de "points" pour ce questionnaire.
// Je rends donc la propriété "points" optionnelle en ajoutant un "?".
export interface Option {
  label: string;
  value: string;
  points?: number; 
}

// J'ajoute l'ID unique et obligatoire à chaque question, ainsi que la logique conditionnelle.
export interface Question {
  id: string; 
  question: string;
  type: 'choix_unique' | 'choix_multiple' | 'nombre' | 'date' | 'texte_court';
  options?: Option[];
  placeholder?: string;
  showIf?: {
    questionId: string;
    value: any;
  };
}

// Les résultats ne sont plus basés sur un score.
export interface Result {
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
