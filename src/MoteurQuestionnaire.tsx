// Fichier : src/MoteurQuestionnaire.tsx (Version avec scoring)

import React, { useState } from 'react';
import { QuestionnaireConfig, Question, Option } from './configurations/types.js';

interface MoteurProps {
  config: QuestionnaireConfig;
  email: string;
}

const MoteurQuestionnaire: React.FC<MoteurProps> = ({ config, email }) => {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(config.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sending, setSending] = useState(false);

  const handleChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => setCurrent(c => c + 1);
  const handlePrev = () => setCurrent(c => c - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // --- Calculs de score ---
  const totalPoints = answers.reduce((sum, answer, idx) => {
    if (!answer) return sum;
    const question = config.questions[idx];
    const option = question.options.find(opt => opt.value === answer);
    return sum + (option?.points || 0);
  }, 0);

  const maxScore = config.questions.reduce((total, question) => {
    const maxPointsInQuestion = Math.max(...question.options.map(opt => opt.points));
    return total + maxPointsInQuestion;
  }, 0);

  const result = config.results.find(r => totalPoints >= r.min && totalPoints <= r.max);
  const progressPercentage = ((current + 1) / config.questions.length) * 100;

  // ... (le reste du code, y compris handleSendResults, reste identique) ...

  // --- Rendu Visuel ---
  if (!submitted) {
    // ... (le JSX du questionnaire reste identique) ...
  }
  
  // --- Écran des résultats ---
  return (
    <div className="text-center animate-fade-in">
        <img src={result?.imageSrc} alt={result?.label} className="w-48 h-48 mx-auto mb-6 object-contain"/>
        <h2 className="text-2xl font-semibold mb-4 text-cyan-vif">Votre Profil de Risque</h2>
        <div className="text-5xl font-bold mb-2 text-white">{totalPoints} / {maxScore}</div>
        <div className="text-3xl font-semibold mb-4 text-cyan-vif">{result?.label}</div>
        <p className="mb-8 text-gray-300 max-w-md mx-auto">{result?.description}</p>
        {/* ... (le reste du JSX pour les boutons reste identique) ... */}
    </div>
  );
};

export default MoteurQuestionnaire;