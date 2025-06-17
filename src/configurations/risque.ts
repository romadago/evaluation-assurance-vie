// Fichier : src/configurations/types.ts (Mis à jour pour le questionnaire de risque)

// Les options n'ont plus besoin de "points" pour ce questionnaire
export interface Option {
  label: string;
  value: string;
}

// On ajoute un ID à la question et la logique conditionnelle
export interface Question {
  id: string; // ID unique pour chaque question, crucial pour la logique
  question: string;
  type: 'choix_unique' | 'choix_multiple' | 'nombre' | 'date' | 'texte_court';
  options?: Option[];
  placeholder?: string;
  // NOUVEAU : Propriété pour afficher une question sous condition
  showIf?: {
    questionId: string; // ID de la question parente
    value: any;         // Valeur de la réponse qui déclenche l'affichage
  };
}

// Les résultats ne sont plus basés sur un score
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
  results: Result[]; // Ce tableau peut être utilisé différemment
}

