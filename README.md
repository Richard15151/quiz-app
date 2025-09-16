# 🏆 Quiz App - Richard de Oliveira Ribeiro

> Status do Projeto: Concluído ✔️

---

## Tabela de Conteúdos
* [Descrição do Projeto](#descrição-do-projeto)
* [Demonstração da Aplicação](#demonstração-da-aplicação)
* [Funcionalidades](#funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Como Rodar o Projeto Localmente](#como-rodar-o-projeto-localmente)
* [Funcionalidades Adicionais](#funcionalidades-adicionais)
* [Desafios e Aprendizados](#desafios-e-aprendizados)
* [Autor](#autor)

---

## Descrição do Projeto
<p align="center">
Este projeto é um aplicativo de Quiz multiplataforma, desenvolvido com React Native e Expo, como projeto final do curso de programação. O aplicativo apresenta um questionário com feedback instantâneo, tela de resultados e a possibilidade de jogar novamente.
</p>

---

## Demonstração da Aplicação
![videoteste](./assets/videos/testequiz.gif)

---

## Funcionalidades

- **Tela de categorias/dificuldade:** Possibilidade de escolha de categoria e dificuldade.
- **Quiz Interativo:** Fluxo de perguntas e respostas com validação.
- **Feedback Visual:** Respostas são marcadas como corretas ou incorretas instantaneamente.
- **Placar:** Pontuação é calculada e atualizada a cada rodada.
- **Tela de Resultados:** Ao final do quiz, uma tela exibe a pontuação final.
- **Jogar Novamente:** O usuário pode reiniciar o quiz a partir da tela de resultados.
- **Funcionalidades Adicionais:** Embaralhamento de perguntas e respostas, Barra de progresso, Feedback sonoro, Feedback Tátil, Efeito Fad In.

---

## Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

---

## Como Rodar o Projeto Localmente

```bash
1. Clone o repositório
$ git clone [link-do-seu-repositorio]

2. Navegue até o diretório do projeto
$ cd quiz-app

3. Instale as dependências
$ npm install

4. Inicie o servidor de desenvolvimento
$ npm start

5. Após executar npm start, pressione w para abrir no navegador ou escaneie o QR Code com o app Expo Go no seu celular.
```

---

## Funcionalidades adicionais

### Descrição
<p align="center">
Nesta versão do aplicativo, além do fluxo básico de perguntas e respostas, foram adicionadas várias melhorias que tornam a experiência do jogador mais dinâmica e envolvente:
</p>

- **Embaralhamento de perguntas:** a cada nova partida, as perguntas e alternativas são reorganizadas aleatoriamente antes do início do quiz, garantindo partidas únicas e evitando padrões repetitivos.
- **Barra de progresso:** mostra visualmente em qual etapa do quiz o usuário está, ajudando a acompanhar o avanço até o final.
- **Feedback sonoro:** sons distintos são reproduzidos para acertos, erros e conclusão da partida, tornando o jogo mais imersivo.
- **Feedback tátil:** em caso de erro, o dispositivo vibra, reforçando a resposta incorreta de forma física e imediata.
- **Efeito Fad In:** cada nova pergunta aparece com uma animação suave de transição, deixando a interface mais agradável e profissional.

<p align="center">
Essas adições tornam o quiz mais interativo, divertido e próximo da experiência de um jogo real.
</p>

---

## Desafios e Aprendizados

<p align="center">
Para implementar essas funcionalidades, foi necessário pesquisar e aplicar diferentes recursos do React Native e do Expo:
</p>

- Utilização do Hook useEffect para embaralhar perguntas e respostas apenas na inicialização ou ao reiniciar o quiz.
- Implementação do algoritmo Fisher-Yates Shuffle, garantindo um embaralhamento justo e eficiente.
- Integração de feedback sonoro com a biblioteca expo-av, exigindo testes para sincronizar áudio com as ações do jogador.
- Uso da API de vibração do React Native para criar o feedback tátil nos erros.
- Implementação da barra de progresso com atualização em tempo real conforme o índice da questão avançava.
- Uso da biblioteca Animated do React Native para aplicar o efeito fade in, exigindo pesquisa sobre interpolação e controle de animações.

<p align="center">
O maior aprendizado foi combinar múltiplos tipos de feedback (visual, sonoro e tátil) para enriquecer a experiência do usuário, além de reforçar boas práticas de estado e efeitos colaterais no React Native.
</p>

---

## Autor

#### Desenvolvido por: Richard de Oliveira Ribeiro
#### Sob a orientação do Prof° Rafael Ribas