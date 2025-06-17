// Fichier : src/configurations/types.ts (Spécifique pour le Questionnaire de Risque)

// Les options n'ont plus besoin de "points".
export interface Option {
  label: string;
  value: string;
}

// Chaque question a un 'id' et peut avoir une condition d'affichage 'showIf'.
export interface Question {
  id: string; 
  question: string;
  type: 'choix_unique' | 'choix_multiple' | 'nombre' | 'date' | 'texte_court';
  options?: Option[];
  placeholder?: string;
  showIf?: {
    questionId: string; // ID de la question parente à vérifier
    value: any;         // Valeur de la réponse qui déclenche l'affichage
  };
}

// Pour ce questionnaire, le concept de "Result" basé sur un score n'est pas utilisé.
export interface Result {}

// La configuration globale du questionnaire.
export interface QuestionnaireConfig {
  id: string;
  titre: string;
  stockageId: string;
  questions: Question[];
  results: Result[];
}