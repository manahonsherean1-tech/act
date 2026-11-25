
import React, { createContext, useContext, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create Context
const UserContext = createContext();

function UserProvider({ children }) {
  const [name, setName] = useState('Juan Dela Cruz');
  const [email, setEmail] = useState('juan@gmail.com');
  const [saving, setSaving] = useState(false);

  const updateProfile = (newName, newEmail) => {
    setSaving(true);

    setTimeout(() => {
      setName(newName);
      setEmail(newEmail);
      setSaving(false);
    }, 1000);
  };

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        saving,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Tab 1: Profile
function ProfileScreen() {
  const { name, email, saving } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      {saving ? (
        <Text style={styles.loading}>Saving profile...</Text>
      ) : (
        <>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </>
      )}
    </View>
  );
}

// Tab 2: Settings
function SettingsScreen() {
  const { name, email, updateProfile, saving } =
    useContext(UserContext);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />

      {saving ? (
        <Text style={styles.loading}>Saving...</Text>
      ) : (
        <Button
          title="Update Profile"
          onPress={() => updateProfile(newName, newEmail)}
        />
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#EBF5FB',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#21618C',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
  loading: {
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 15,
  },
});
