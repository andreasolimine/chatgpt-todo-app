import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTaskList([...taskList, newTask]);
      setNewTask('');
    }
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
        <Button title="Aggiungi" onPress={addTask} />
      </View>

      <View style={styles.taskListContainer}>
        {taskList.map((task, index) => (
          <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
            <View style={styles.taskItem}>
              <Text>{task}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    paddingHorizontal: 10, // Aggiunta del padding orizzontale al contenitore della lista
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
