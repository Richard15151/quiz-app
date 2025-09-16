import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategoryScreenProps {
  onSelectCategory: (category: string) => void;
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const categories = [
  { id: 'addition', label: 'Adição' },
  { id: 'subtraction', label: 'Subtração' },
  { id: 'multiplication', label: 'Multiplicação' },
  { id: 'division', label: 'Divisão' },
  { id: 'mixed', label: 'Mista' },
];

const difficulties: { id: 'easy' | 'medium' | 'hard'; label: string }[] = [
  { id: 'easy', label: 'Fácil' },
  { id: 'medium', label: 'Médio' },
  { id: 'hard', label: 'Difícil' },
];

export default function CategoryScreen({ onSelectCategory, onSelectDifficulty }: CategoryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleStart = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (selectedCategory) {
      onSelectCategory(selectedCategory);
      onSelectDifficulty(difficulty);
    } else {
      alert('Selecione uma categoria primeiro!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma Categoria</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              selectedCategory === cat.id && styles.selectedButton,
            ]}
            onPress={() => handleCategorySelect(cat.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.selectedText,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Escolha a Dificuldade</Text>
      <View style={styles.categoriesContainer}>
        {difficulties.map((dif) => (
          <TouchableOpacity
            key={dif.id}
            style={styles.difficultyButton}
            onPress={() => handleStart(dif.id)}
          >
            <Text style={styles.difficultyText}>{dif.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  categoryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    margin: 8,
    borderWidth: 2,
    borderColor: '#007BFF',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  selectedText: {
    color: '#ffffff',
  },
  difficultyButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    margin: 8,
    borderWidth: 2,
    borderColor: '#28A745',
    minWidth: 100,
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
});
