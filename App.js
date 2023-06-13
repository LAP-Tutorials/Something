import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import * as Font from 'expo-font';

const App = () => {
  const colors = ['#104673', '#6CB7F4', '#2294F2', '#325673', '#1B75BF']; // Define an array of colors

  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState(colors[currentColorIndex]);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'ShareTechMono-Regular': require('./assets/fonts/ShareTechMono-Regular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    setCurrentColor(colors[currentColorIndex]);
  }, [currentColorIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000); // Change color every 1 second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      // Handle the back button press here
      // You can add any additional logic or confirmation dialogs if needed
      BackHandler.exitApp(); // Close the app
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={BackHandler.exitApp}>
        <Text style={styles.closeButtonText}>X Close APP</Text>
      </TouchableOpacity>
      <Text style={styles.text}>something</Text>
      <View style={[styles.circle, { backgroundColor: currentColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141413',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'ShareTechMono-Regular',
    color: '#2196f3',
    fontSize: 35,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    left: 16,
    padding: 8,
    backgroundColor: '#2196f3',
    borderRadius: 1,
    zIndex: 1,
  },
  closeButtonText: {
    fontFamily: 'ShareTechMono-Regular',
    color: 'white',
    fontSize: 16,
  },
});

export default App;
