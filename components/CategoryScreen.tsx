import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CategoryScreen({
  onStart,
  onBack,
}: {
  onStart: (cat: string, diff: "easy" | "medium" | "hard") => void;
  onBack: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);

  const categories = [
    { id: "addition", label: "Adição" },
    { id: "subtraction", label: "Subtração" },
    { id: "multiplication", label: "Multiplicação" },
    { id: "division", label: "Divisão" },
    { id: "mixed", label: "Misto" },
  ];

  const difficulties = [
    { id: "easy", label: "Fácil" },
    { id: "medium", label: "Médio" },
    { id: "hard", label: "Difícil" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a categoria</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              selectedCategory === cat.id && styles.selectedButton,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
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

      <Text style={styles.title}>Escolha a dificuldade</Text>

      <View style={styles.categoriesContainer}>
        {difficulties.map((diff) => (
          <TouchableOpacity
            key={diff.id}
            style={[
              styles.difficultyButton,
              selectedDifficulty === diff.id && styles.selectedButton,
            ]}
            onPress={() =>
              setSelectedDifficulty(diff.id as "easy" | "medium" | "hard")
            }
          >
            <Text
              style={[
                styles.difficultyText,
                selectedDifficulty === diff.id && styles.selectedText,
              ]}
            >
              {diff.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCategory && selectedDifficulty && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => onStart(selectedCategory, selectedDifficulty)}
        >
          <Text style={styles.startButtonText}>Iniciar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Voltar ao início</Text>
      </TouchableOpacity>
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
    color: '#1F2D4D',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
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
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  difficultyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
  selectedText: {
    color: '#ffffff',
  },
  startButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2852a7ff',
  },
  backButtonText: {
    textAlign: 'center',
    color:'#2852a7ff',
    fontSize: 16,
  },
});
