import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import CategoryScreen from '../components/CategoryScreen';
import addition from '../questions/adicao.json';
import subtraction from '../questions/subtracao.json';
import multiplication from '../questions/multiplicacao.json';
import division from '../questions/divisao.json';
import { Audio } from 'expo-av';
import { Vibration } from 'react-native';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Funções de áudio
async function playCorrectSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audios/correct-choice-43861.mp3')
  );
  await sound.playAsync();
}

async function playWrongSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audios/error-010-206498.mp3')
  );
  await sound.playAsync();
}

async function playWinSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audios/goodresult-82807.mp3')
  );
  await sound.playAsync();
}

// Função para embaralhar arrays
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Função para pegar questões
function getQuestions(
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  numQuestions = 10
): Question[] {
  let selectedQuestions: Question[] = [];

  switch (category) {
    case 'addition':
      selectedQuestions = addition[difficulty];
      break;
    case 'subtraction':
      selectedQuestions = subtraction[difficulty];
      break;
    case 'multiplication':
      selectedQuestions = multiplication[difficulty];
      break;
    case 'division':
      selectedQuestions = division[difficulty];
      break;
    case 'mixed':
      const all = [
        ...addition[difficulty],
        ...subtraction[difficulty],
        ...multiplication[difficulty],
        ...division[difficulty],
      ];
      selectedQuestions = shuffleArray(all).slice(0, numQuestions);
      break;
    default:
      selectedQuestions = [];
  }

  return shuffleArray(selectedQuestions).map(q => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  

  // Atualiza perguntas quando categoria e dificuldade forem selecionadas
  useEffect(() => {
    if (selectedCategory && selectedDifficulty) {
      const q = getQuestions(selectedCategory, selectedDifficulty, 10);
      setQuestions(q);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsQuizFinished(false);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    }
  }, [selectedCategory, selectedDifficulty]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playCorrectSound();
    } else {
      playWrongSound();
      Vibration.vibrate(400);
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
      playWinSound();
    }
  };

  const handlePlayAgain = () => {
    // Volta para tela de seleção de categoria/dificuldade
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  // Renderização
  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} logoSource={require('../assets/images/logo.png')} />;
  }

  if (!selectedCategory || !selectedDifficulty) {
    return (
    <CategoryScreen
      onStart={(cat, diff) => {
        setSelectedCategory(cat);
        setSelectedDifficulty(diff);
      }}
      onBack={() => setShowWelcome(true)}
    />
  );
}

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
