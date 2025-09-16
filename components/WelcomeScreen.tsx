import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type WelcomeScreenProps = {
  onStart: () => void;
  logoSource?: any; // optional prop to pass a local image (require('../assets/logo.png'))
};

export default function WelcomeScreen({ onStart, logoSource }: WelcomeScreenProps) {
  const fade = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(btnScale, { toValue: 1.05, friction: 6, useNativeDriver: true }),
      Animated.spring(btnScale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();
    onStart();
  };

  return (
    <LinearGradient colors={["#E6F3FF", "#F9FBFF"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {logoSource ? <Image source={logoSource} style={styles.heroImage} /> : null}

        <Animated.View
          style={[
            styles.card,
            {
              opacity: fade,
              transform: [
                {
                  translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }),
                },
              ],
            },
          ]}
        >

          <Text style={styles.title}>Bem-vindo ao MathMagic</Text>
          <Text style={styles.subtitle}>
            Responda 10 questões por rodada. Escolha a categoria e o nível — boa sorte!
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBubble}>
              <Text style={styles.metaTitle}>⏱️ 10 perguntas</Text>
            </View>
            <View style={styles.metaBubble}>
              <Text style={styles.metaTitle}>🎯 Múltiplas categorias</Text>
            </View>
          </View>

          <Animated.View style={{ transform: [{ scale: btnScale }], marginTop: 18 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>Começar</Text>
            </TouchableOpacity>
          </Animated.View>

        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#122240',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2D4D',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#556080',
    textAlign: 'center',
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  metaBubble: {
    backgroundColor: '#F2F7FF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  metaTitle: {
    color: '#2D4B8A',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#5B8CFF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  heroImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
