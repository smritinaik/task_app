import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
  useFocusEffect,
} from 'expo-router';

import { useCallback } from 'react';
import { useTasks, Priority } from '../context/TaskContext';

const COLORS = {
  background: '#0A0A0A',
  surface: '#141414',
  border: '#1F1F1F',

  textMain: '#FFFFFF',
  textMuted: '#8E8E93',

  pinkAccent: '#E28087',

  high: '#FF5C5C',
  medium: '#5C9DFF',
  low: '#E6C64F',
};

export default function AddTaskScreen() {
  const {
    tasks,
    addTask,
    updateTask,
  } = useTasks();

  const { taskId } = useLocalSearchParams();

  const [title, setTitle] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [priority, setPriority] =
    useState<Priority>('MEDIUM');


useFocusEffect(
  useCallback(() => {
    const task =
      typeof taskId === 'string'
        ? tasks.find(
            item => item.id === taskId
          )
        : null;

    if (task) {
      // EDIT MODE
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      // ADD MODE
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
    }
  }, [taskId, tasks])
);




const handleSave = () => {
  if (!title.trim()) {
    Alert.alert(
      'Missing Title',
      'Please enter a task title'
    );
    return;
  }

  if (taskId) {
    const existingTask = tasks.find(
      task => task.id === taskId
    );

    updateTask({
      id: taskId as string,
      title,
      description,
      priority,

      // preserve existing values
      completed:
        existingTask?.completed ?? false,

      imageUri:
        existingTask?.imageUri ?? null,
    });

    Alert.alert(
      'Success',
      'Task updated'
    );
  } else {
    addTask({
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false,
      imageUri: null,
    });

    Alert.alert(
      'Success',
      'Task saved'
    );
  }

  // Clear form
  setTitle('');
  setDescription('');
  setPriority('MEDIUM');

  // Go back to Home
  router.navigate('/');
};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {taskId
          ? 'Edit Task'
          : 'Add Task'}
      </Text>

      <Text style={styles.label}>
        Task Title
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        placeholderTextColor={
          COLORS.textMuted
        }
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={styles.description}
        placeholder="Enter description"
        placeholderTextColor={
          COLORS.textMuted
        }
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>
        Priority
      </Text>

      <View style={styles.priorityRow}>
        <PriorityButton
          label="HIGH"
          color={COLORS.high}
          active={
            priority === 'HIGH'
          }
          onPress={() =>
            setPriority('HIGH')
          }
        />

        <PriorityButton
          label="MEDIUM"
          color={COLORS.medium}
          active={
            priority === 'MEDIUM'
          }
          onPress={() =>
            setPriority('MEDIUM')
          }
        />

        <PriorityButton
          label="LOW"
          color={COLORS.low}
          active={
            priority === 'LOW'
          }
          onPress={() =>
            setPriority('LOW')
          }
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          {taskId
            ? 'UPDATE TASK'
            : 'SAVE TASK'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function PriorityButton({
  label,
  color,
  active,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.priorityButton,
        {
          backgroundColor: active
            ? color
            : COLORS.surface,

          borderColor: color,
        },
      ]}
    >
      <Text
        style={{
          fontWeight: '700',
          color: active
            ? '#FFFFFF'
            : COLORS.textMuted,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    padding: 24,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textMain,
    marginTop: 50,
    marginBottom: 30,
    letterSpacing: -0.5,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 8,
    marginTop: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  input: {
    backgroundColor:
      COLORS.surface,

    borderColor:
      COLORS.border,

    borderWidth: 1,

    borderRadius: 16,

    paddingHorizontal: 16,

    height: 55,

    fontSize: 15,
    fontWeight: '600',

    color: COLORS.textMain,
  },

  description: {
    backgroundColor:
      COLORS.surface,

    borderColor:
      COLORS.border,

    borderWidth: 1,

    borderRadius: 16,

    padding: 16,

    height: 140,

    textAlignVertical: 'top',

    fontSize: 15,
    fontWeight: '600',

    color: COLORS.textMain,
  },

  priorityRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop: 10,
  },

  priorityButton: {
    width: '31%',
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
  },

  saveButton: {
    marginTop: 40,

    backgroundColor:
      COLORS.pinkAccent,

    height: 58,

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor:
      COLORS.pinkAccent,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 2,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});