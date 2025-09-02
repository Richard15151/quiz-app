import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";

// importando o banco de dados no json
import questions from '../questions.json';

export default function QuizScreen(){

    // pegando a primeira questão
    const currentQuestion = questions[0];

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
                    <TouchableOpacity key={option} style={styles.option}>
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
});