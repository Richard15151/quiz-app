import { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import questions from '../questions.json';
import { Audio } from 'expo-av';

// Função para tocar o som de acerto
async function playCorrectSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audios/correct-choice-43861.mp3')
  );
  await sound.playAsync();
}
// Função para tocar o som de erro
async function playWrongSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audios/error-010-206498.mp3')
  );
  await sound.playAsync();
}
// Função para tocar o som de vitória
async function playWinSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audios/goodresult-82807.mp3')
  );
  await sound.playAsync();
}

export default function HomePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playCorrectSound()
    }else{
      playWrongSound()
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
      playWinSound()
    }
  };

  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
  };

  return isQuizFinished ? (
    <ResultScreen
      score={score}
      totalQuestions={questions.length}
      onPlayAgain={handlePlayAgain}
    />
  ) : (
    <QuizScreen
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}