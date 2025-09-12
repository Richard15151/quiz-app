import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
 
//usando typescript para definir os tipos de props que esperamos receber

type ResultScreenProps = {
    score: number
    totalQuestions: number
    onPlayAgain: () => void //esperamos uma função para o botão
}

export default function ResultScreen({ score, totalQuestions, onPlayAgain}: ResultScreenProps){
    const getResultMessage = () => {
    const percentage = (score / totalQuestions) * 100;

    if (percentage === 100) return "🏆 Perfeito! Você é um mestre das operações!";
    if (percentage >= 70) return "🔥 Mandou bem! Quase lá!";
    if (percentage >= 40) return "🙂 Bom esforço, continue praticando!";
    return "😵 Opa! Bora treinar mais um pouquinho!";
  };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Fim de Jogo!</Text>
            <Text style={styles.scoreText}>
                Você acertou {score} de {totalQuestions} perguntas!
            </Text>
            <Text style={styles.resultMessage}>{getResultMessage()}</Text>
            <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
                <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 22,
    marginBottom: 40,
    color: '#444',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 14,
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  resultMessage: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },

});

