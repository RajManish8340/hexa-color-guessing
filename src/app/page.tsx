"use client"
import React, { useState, useEffect } from 'react';

enum Result {
  Correct = 'correct',
  Wrong = 'wrong'
}

const getRandomColor = (): string => {
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  
  return color;
};

const ColorGuessingGame: React.FC = () => {
  const [color, setColor] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectionResult, setSelectionResult] = useState<Result | undefined>(undefined);

  const generateColors = (): void => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    
    const answerOptions = [
      actualColor,
      getRandomColor(),
      getRandomColor()
    ];
    
    const shuffledAnswers = answerOptions.sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
    
    setSelectionResult(undefined);
  };

  const handleAnswerClicked = (selectedAnswer: string): void => {
    if (selectedAnswer === color) {
      setSelectionResult(Result.Correct);

      setTimeout(() => {
        generateColors();
      }, 1500);
    } else {
      setSelectionResult(Result.Wrong);
    }
  };

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Color Guessing Game
        </h1>
        
        <p className="text-lg mb-6 text-gray-600 max-w-md">
          Look at the color below and guess which hexadecimal code represents it!
        </p>


        <div 
          className="guessMe w-48 h-48 mx-auto mb-8 border-4 border-gray-300 rounded-lg shadow-lg"
          style={{ backgroundColor: color }}
        />


        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {answers.map((answer, index) => (
            <button
              key={`${answer}-${index}`}
              onClick={() => handleAnswerClicked(answer)}
              className="text-black px-6 py-3 text-lg font-mono bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors duration-200 min-w-32"
              disabled={selectionResult === Result.Correct}
            >
              {answer}
            </button>
          ))}
        </div>


        {selectionResult && (
          <div className="text-xl font-semibold mb-4">
            {selectionResult === Result.Correct ? (
              <span className="text-green-600">✅ Correct!</span>
            ) : (
              <span className="text-red-600">❌ Wrong answer</span>
            )}
          </div>
        )}

        {selectionResult === Result.Correct && (
          <p className="text-gray-600">Loading next challenge...</p>
        )}
      </div>


      <div className="mt-12 max-w-2xl text-sm text-gray-500 text-center">
        <p className="mb-2">
          <strong>Tip:</strong> Hex colors are made up of Red, Green, and Blue values.
        </p>
        <p>
          For example: #FF0000 is pure red, #00FF00 is pure green, #0000FF is pure blue
        </p>
      </div>
    </div>
  );
};

export default ColorGuessingGame;