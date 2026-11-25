
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
const StudentContext = createContext();

function StudentProvider({ children }) {
  const [student, setStudent] = useState({
    name: 'Juan Dela Cruz',
    course: 'BS Information Technology',
    year: '2nd Year',
  });

  const [loading, setLoading] = useState(false);

  const updateStudent = (course, year) => {
    setLoading(true);

    setTimeout(() => {
      setStudent(prev => ({
        ...prev,
        course,
        year,
      }));

      setLoading(false);
    }, 1000);
  };

  return (
    <StudentContext.Provider
      value={{ student, updateStudent, loading }}
    >
      {children}
    </StudentContext.Provider>
  );
}

// Tab 1: Dashboard
function DashboardScreen() {
  const { student, loading } = useContext(StudentContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Dashboard</Text>

      {loading ? (
        <Text style={styles.loading}>
          Updating student information...
        </Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>{student.name}</Text>

          <Text style={styles.label}>Course:</Text>
          <Text style={styles.value}>{student.course}</Text>

          <Text style={styles.label}>Year Level:</Text>
          <Text style={styles.value}>{student.year}</Text>
        </View>
      )}
    </View>
  );
}

// Tab 2: Student Settings
function StudentSettingsScreen() {
  const { student, updateStudent, loading } =
    useContext(StudentContext);

  const [course, setCourse] = useState(student.course);
  const [year, setYear] = useState(student.year);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Settings</Text>

      <Text>Course</Text>
      <TextInput
        style={styles.input}
        value={course}
        onChangeText={setCourse}
      />

      <Text>Year Level</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
      />

      {loading ? (
        <Text style={styles.loading}>Saving changes...</Text>
      ) : (
        <Button
          title="Update Student"
          onPress={() => updateStudent(course, year)}
        />
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Settings" component={StudentSettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </StudentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F4ECF7',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#76448A',
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7D3C98',
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    marginTop: 5,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    marginTop: 8,
    marginBottom: 18,
    borderRadius: 8,
  },
  loading: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 15,
  },
});
