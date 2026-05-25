import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  useState,
  useEffect,
} from 'react';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  useTasks,
  Priority,
} from '../context/TaskContext';

const COLORS = {
  background: '#FFF8F6',

  high: '#FF8A8A',
  medium: '#8FC6FF',
  low: '#FFE28A',

  dark: '#2F2F2F',

  white: '#FFFFFF',
};

export default function AddTaskScreen() {
  const {
    tasks,
    addTask,
    updateTask,
  } = useTasks();

  const { taskId } =
    useLocalSearchParams();

  const [title, setTitle] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [priority, setPriority] =
    useState<Priority>('MEDIUM');



  useEffect(() => {
    // New task → clear form
    if (!taskId) {
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      return;
    }

    // Edit existing task
    const task = tasks.find(
      item => item.id === taskId
    );

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [taskId, tasks]);


  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert(
        'Missing Title',
        'Please enter a task title'
      );
      return;
    }

    if (taskId) {
      updateTask({
        id: taskId as string,
        title,
        description,
        priority,
        completed: false,
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
      });

      Alert.alert(
        'Success',
        'Task saved'
      );
    }

    setTitle('');
setDescription('');
setPriority('MEDIUM');

router.replace('/');
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
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={styles.description}
        placeholder="Enter description"
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
          active={priority === 'HIGH'}
          onPress={() =>
            setPriority('HIGH')
          }
        />

        <PriorityButton
          label="MEDIUM"
          color={COLORS.medium}
          active={priority === 'MEDIUM'}
          onPress={() =>
            setPriority('MEDIUM')
          }
        />

        <PriorityButton
          label="LOW"
          color={COLORS.low}
          active={priority === 'LOW'}
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
            : '#fff',
          borderColor: color,
        },
      ]}
    >
      <Text
        style={{
          fontWeight: '700',
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
    backgroundColor: COLORS.background,
    padding: 24,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.dark,
    marginTop: 50,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 18,
  },

  input: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 55,
  },

  description: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    height: 140,
    textAlignVertical: 'top',
  },

  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  priorityButton: {
    width: '31%',
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
  },

  saveButton: {
    marginTop: 40,
    backgroundColor: '#E89A9F',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});