// Fichier : src/MoteurQuestionnaire.tsx

import React, { useState } from 'react';
import { QuestionnaireConfig, Question } from './configurations/types.js';

interface MoteurProps {
  config: QuestionnaireConfig;
  email: string;
}

const MoteurQuestionnaire: React.FC<MoteurProps> = ({ config, email }) => {
  // --- STATE MANAGEMENT ---
  const [answers, setAnswers] = useState<(string | null)[]>(Array(config.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  // Nouvel état pour gérer l'envoi de l'email
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');


  // --- HANDLERS ---
  const handleChange = (value: string) => {
    setAnswers(newAnswers => {
      const updatedAnswers = [...newAnswers];
      updatedAnswers[current] = value;
      return updatedAnswers;
    });
  };
  const handleNext = () => setCurrent(c => c + 1);
  const handlePrev = () => setCurrent(c => c - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const handleReset = () => {
    setAnswers(Array(config.questions.length).fill(null));
    setSubmitted(false);
    setCurrent(0);
    setSendStatus('idle');
  };
  
  // --- FONCTION D'ENVOI D'EMAIL (AMÉLIORÉE) ---
  const handleSendResults = async () => {
    setSending(true);
    setSendStatus('idle');

    // On s'assure que les résultats sont bien calculés avant de les envoyer
    if (!result) {
        console.error("Les résultats n'ont pas pu être calculés.");
        setSending(false);
        setSendStatus('error');
        return;
    }

    try {
      const response = await fetch('/.netlify/functions/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // L'email de l'utilisateur
          quizTitle: config.titre, // Le titre du quiz
          score: totalPoints, // Le score obtenu
          maxScore, // Le score maximum possible
          resultLabel: result.label, // Ex: "Avancé"
          resultDescription: result.description, // La description du résultat
        }),
      });

      if (!response.ok) {
        throw new Error('La réponse du serveur n\'est pas OK');
      }

      setSendStatus('success');

    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail:", error);
      setSendStatus('error');
    } finally {
      setSending(false);
    }
  };


  // --- CALCULS ---
  const totalPoints = answers.reduce((sum, answer, idx) => {
    if (answer === null) return sum;
    const question = config.questions[idx];
    if (!question) return sum;
    const option = question.options.find((opt) => opt.value === answer);
    return sum + (option ? option.points : 0);
  }, 0);

  const maxScore = config.questions.reduce((total, question) => {
    const maxPointsInQuestion = Math.max(...question.options.map(opt => opt.points));
    return total + maxPointsInQuestion;
  }, 0);

  const result = config.results.find(r => totalPoints >= r.min && totalPoints <= r.max);
  const progressPercentage = ((current + 1) / config.questions.length) * 100;

  // Le reste du code JSX reste identique...

  // --- JSX (Rendu visuel) ---
  if (!submitted) {
    const currentQuestion: Question = config.questions[current];
    return (
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-8 text-center text-cyan-vif">{config.titre}</h1>
        <div className="mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2 text-sm text-gray-300">
              <span>Question {current + 1}/{config.questions.length}</span>
              <span>Progression</span>
            </div>
            <div className="w-full bg-fond-sombre rounded-full h-2">
              <div className="bg-cyan-vif h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <p className="text-xl font-semibold mb-6 text-gray-200">{currentQuestion.question}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((opt) => (
              <label key={opt.value} className={`block cursor-pointer p-4 rounded-xl transition-all duration-200 ${answers[current] === opt.value ? 'bg-cyan-vif text-fond-sombre font-bold ring-2 ring-white' : 'bg-fond-sombre hover:bg-bloc-sombre border border-cyan-vif/50 text-gray-200'}`}>
                <input type="radio" name={`q${current}`} value={opt.value} checked={answers[current] === opt.value} onChange={() => handleChange(opt.value)} className="hidden" required />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <button type="button" className="px-6 py-2 rounded-lg font-semibold border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={handlePrev} disabled={current === 0}>Précédent</button>
          {current < config.questions.length - 1 ? (
            <button type="button" className="px-6 py-2 rounded-lg font-semibold bg-cyan-vif text-fond-sombre hover:bg-opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleNext} disabled={answers[current] === null}>Suivant</button>
          ) : (
            <button type="submit" className="px-6 py-2 rounded-lg font-semibold bg-cyan-vif text-fond-sombre hover:bg-opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" disabled={answers[current] === null}>Voir mon résultat</button>
          )}
        </div>
      </form>
    );
  }

  // L'écran des résultats
  return (
    <div className="text-center animate-fade-in">
      <img src={result?.imageSrc} alt={result?.label} className="w-48 h-48 mx-auto mb-6 object-contain"/>
      <h2 className="text-2xl font-semibold mb-4 text-cyan-vif">Votre Résultat</h2>
      <div className="text-5xl font-bold mb-2 text-white">{totalPoints} / {maxScore}</div>
      <div className="text-3xl font-semibold mb-4 text-cyan-vif">{result?.label}</div>
      <p className="mb-8 text-gray-300 max-w-md mx-auto">{result?.description}</p>
      
      <div className="mt-8 border-t border-cyan-vif/20 pt-8 max-w-sm mx-auto">
        <p className="text-gray-300 mb-4">Un récapitulatif va être envoyé à <strong>{email}</strong>.</p>
        <button
          onClick={handleSendResults}
          disabled={sending || sendStatus === 'success'}
          className="w-full px-4 py-3 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? 'Envoi en cours...' : sendStatus === 'success' ? 'Résultats Envoyés !' : 'Recevoir mes résultats'}
        </button>
        {sendStatus === 'error' && <p className="text-red-500 mt-2">Une erreur est survenue. Veuillez réessayer.</p>}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold border-2 border-cyan-vif text-cyan-vif hover:bg-cyan-vif hover:text-fond-sombre transition-colors" onClick={handleReset}>
          Recommencer
        </button>
        <a href="https://doodle.com/bp/romaindagnano/rdv-decouverte-aeternia" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-8 py-3 rounded-lg font-semibold bg-cyan-vif text-fond-sombre hover:bg-opacity-80 transition-opacity">
          Prendre rendez-vous
        </a>
      </div>
    </div>
  );
};

export default MoteurQuestionnaire;
