import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';

const App = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (timerStarted) {
      interval = setInterval(() => {
        setSecondsRemaining(seconds => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted]);

  const formatDigits = number => `0${number}`.slice(-2);

  const getRemaining = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return {minutes: formatDigits(minutes), seconds: formatDigits(seconds)};
  };

  const {minutes, seconds} = getRemaining(secondsRemaining);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTimerStarted(!timerStarted)}>
          <Text style={styles.buttonText}>Start Timer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 65,
    color: '#fff',
    marginBottom: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: 'aqua',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 30,
    color: 'aqua',
  },
});

export default App;
