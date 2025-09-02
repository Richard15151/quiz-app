import React from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";

// importando o banco de dados no json
import questions from '../questions.json';

export default function QuizScreen(){
    //criando estado para guardar indice da pergunta atual
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    //guarda a opção que o usuário selecionou
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    //Controla se as opções devem ser desabilitadas
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false)
    
    //Usando a variável para buscar a pergunta correta 
    const currentQuestion = questions[currentQuestionIndex]

    const handleOptionPress = (selectedOption: string) => {
        setSelectedOption(selectedOption);
        setIsOptionsDisabled(true)
    }

    const getOptionStyle = (option: string) =>{
        if (selectedOption){
            const isCorrect = option === currentQuestion.correctAnswer
            if (isCorrect){
                return styles.correctOption
            }
            if (option === selectedOption && !isCorrect){
                return styles.incorrectOption
            }
        }
        return{}
    }

    return (
        <View style={styles.container}>
            {/* Container para a pergunta */}
            <View style={styles.questionContainer}>
                {/* exibindo a questão como propiedade question */}
                <Text style={styles.questionText}>
                    {currentQuestion.question}
                </Text>
            </View>

            {/* Container para as Alternativas */}
            <View style={styles.optionsContainer}>
                {/* usamos o .map() para criar um botão para cada item do array */}
                {/* Usamos TouchableOpacity para dar feedback de toque */}
                {currentQuestion.options.map((option) =>(
                    <TouchableOpacity key={option} style={[styles.option, getOptionStyle(option)]} onPress={() => handleOptionPress(option)}
                    disabled={isOptionsDisabled}>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>

                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //Faz o container principal ocupar a tela inteira
        backgroundColor: '#f0f8ff',
        padding: 16, // Um espaçamento geral nas bordas da tela
    },
    questionContainer: {
        flex: 1, //Faz este container ocupar metade do espaço disponível
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        justifyContent: 'center', // Centraliza o conteúdo (o Text) na vertical
        marginBottom:20, // Uma margem para separar da área de opções
    },
    questionText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', // Centraliza o texto dentro do componente Text
    },
    optionsContainer: {
        flex: 1, // Faz este computador ocupar a outra metade do espaço
        justifyContent: 'space-around', // Distribui as opções com espaço igual ao redor
    },
    option: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    optionText: {
        fontSize: 18,
    },
    correctOption:{
        borderColor: '#4CAF50', // Verde
        backgroundColor: '#D4EDDA',
        borderWidth: 2,
    },
    incorrectOption:{
        borderColor: '#F44336', // Vermelho
        backgroundColor: '#F8D7DA',
        borderWidth: 2,
    }
});