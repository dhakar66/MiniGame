import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setguessRounds] = useState(0);

  function pickNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setguessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    // setGameIsOver(true);
    setguessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.ParentScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.ParentScreen}
          imageStyle={styles.backgroundImgae}
        >
          <SafeAreaView style={styles.ParentScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  ParentScreen: {
    flex: 1,
  },
  backgroundImgae: {
    opacity: 0.15,
  },
});
