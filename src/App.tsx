// Fichier : src/App.tsx (pour le questionnaire de risque)

import { useState } from 'react';
import MoteurQuestionnaire from './MoteurQuestionnaire';
import { configRisque } from './configurations/risque.js'; // <= NOUVELLE CONFIG
import logoAeternia from './logo-aeternia.svg';
import './index.css';

function App() {
  const [email, setEmail] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const config = configRisque; // <= NOUVELLE CONFIG

  // ... le reste du fichier App.tsx reste identique ...
  
  return (
      // ... la structure JSX reste la même ...
      // Elle affichera le titre de la nouvelle config dynamiquement
      // et lancera le moteur avec la bonne config.
      <div className="min-h-screen ...">
          {/* ... */}
          <div className="bg-bloc-sombre ...">
              {!quizStarted ? (
                  <div className="text-center ...">
                      <h1 className="text-3xl ...">{config.titre}</h1>
                      {/* ... */}
                  </div>
              ) : (
                  <MoteurQuestionnaire config={config} email={email} />
              )}
          </div>
      </div>
  );
}

export default App;
