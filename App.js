import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    saveData();
  }, [taskList]);

  const retrieveData = async () => {
    try {
      const storedTaskList = await AsyncStorage.getItem('taskList');
      if (storedTaskList !== null) {
        setTaskList(JSON.parse(storedTaskList));
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      if (editMode) {
        const updatedList = [...taskList];
        updatedList[editIndex].title = newTask;
        setTaskList(updatedList);
        setEditMode(false);
        setEditIndex(null);
      } else {
        setTaskList([...taskList, { title: newTask, completed: false }]);
      }
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedList = [...taskList];
    updatedList[index].completed = !updatedList[index].completed;
    setTaskList(updatedList);
  };

  const editTask = (index) => {
    setNewTask(taskList[index].title);
    setEditMode(true);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedList = [...taskList];
    updatedList.splice(index, 1);
    setTaskList(updatedList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TaskTrack</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Aggiungi una nuova attività"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <Button title={editMode ? 'Modifica' : 'Aggiungi'} onPress={addTask} />
      </View>

      <ScrollView style={styles.taskListContainer}>
        {taskList.map((task, index) => (
          <TouchableOpacity key={index} onPress={() => toggleTaskCompletion(index)}>
            <View style={[styles.taskItem, task.completed ? styles.completedTask : null]}>
              <View style={{ flex: 1, maxWidth: windowWidth - 140 }}>
                <Text style={task.completed ? styles.completedTaskText : null} numberOfLines={1}>
                  {task.title}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Modifica" onPress={() => editTask(index)} />
                <Button title="Elimina" onPress={() => deleteTask(index)} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  taskListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  completedTask: {
    backgroundColor: '#f2f2f2',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
