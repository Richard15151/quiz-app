import { useState, useEffect } from 'react';
import { Text } from 'react-native'
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import rawQuestions from '../questions.json';
import questions from '../questions.json';
import { Audio } from 'expo-av';
import { Vibration } from 'react-native';

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

//função para embaralhar as perguntas
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomQuestions(allQuestions: typeof rawQuestions, num: number) {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, num).map(q => ({
    ...q,
    options: shuffleArray(q.options), // embaralha as opções também
  }));
}


export default function HomePage() {
  const [questions, setQuestions] = useState<typeof rawQuestions>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
  // embaralha e pega 10 perguntas no início
  setQuestions(getRandomQuestions(rawQuestions, 10));
  }, []);
  
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playCorrectSound()
    }else{
      playWrongSound()
      Vibration.vibrate(400)
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
    setQuestions(getRandomQuestions(rawQuestions, 10)); // pega apenas 10 perguntas

    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    };
    if (questions.length === 0) {
    return <Text>Carregando perguntas...</Text>;
  }
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
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
    />
  );
}