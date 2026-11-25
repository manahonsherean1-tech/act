
import React, { createContext, useContext, useState } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    setLoading(true);

    setTimeout(() => {
      setDarkMode(prev => !prev);
      setLoading(false);
    }, 1000);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme, loading }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Tab 1: Home
function HomeScreen() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? '#222' : '#FFFFFF'
        }
      ]}
    >
      <Text
        style={[
          styles.heading,
          { color: darkMode ? 'white' : 'black' }
        ]}
      >
        Welcome Home!
      </Text>

      <Text
        style={{ color: darkMode ? 'white' : 'black' }}
      >
        Current Theme: {darkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
    </View>
  );
}

// Tab 2: Appearance
function AppearanceScreen() {
  const { darkMode, toggleTheme, loading } =
    useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appearance Settings</Text>

      <Text style={styles.description}>
        Current Theme: {darkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>

      {loading ? (
        <Text style={styles.loading}>Applying theme...</Text>
      ) : (
        <Button
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onPress={toggleTheme}
        />
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appearance" component={AppearanceScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 17,
    marginBottom: 20,
  },
  loading: {
    color: 'blue',
    fontSize: 16,
    marginTop: 15,
  },
});
