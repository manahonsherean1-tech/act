
import React, { createContext, useContext, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create Context
const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Study React Native' },
    { id: '2', title: 'Complete Activity 6' },
  ]);

  const [loading, setLoading] = useState(false);

  const addTask = (title) => {
    if (!title.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setTasks(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          title: title
        }
      ]);

      setLoading(false);
    }, 1000);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
}

// Tab 1: Tasks
function TasksScreen() {
  const { tasks } = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.task}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text>No tasks available.</Text>
        }
      />

      <Text style={styles.count}>
        Total Tasks: {tasks.length}
      </Text>
    </View>
  );
}

// Tab 2: Add Task
function AddTaskScreen() {
  const { addTask, loading } = useContext(TaskContext);
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task.trim() || loading) return;

    addTask(task);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your task"
        value={task}
        onChangeText={setTask}
      />

      {loading ? (
        <Text style={styles.loading}>Adding task...</Text>
      ) : (
        <Button
          title="Add Task"
          onPress={handleAdd}
        />
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Add Task" component={AddTaskScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF2E9',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#BA4A00',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  task: {
    fontSize: 17,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  loading: {
    color: 'green',
    marginTop: 15,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});
