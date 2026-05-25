import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import { useTasks } from '../context/TaskContext';

import { router } from 'expo-router';

const COLORS = {
  bg: '#FFF8F6',

  high: '#FFD6D6',
  medium: '#DCEBFF',
  low: '#FFF4C9',

  dark: '#2D3436',
};

export default function HomeScreen() {
  const {
    tasks,
    deleteTask,
    toggleTask,
  } = useTasks();

  const highTasks = tasks.filter(
    t => t.priority === 'HIGH'
  );

  const mediumTasks = tasks.filter(
    t => t.priority === 'MEDIUM'
  );

  const lowTasks = tasks.filter(
    t => t.priority === 'LOW'
  );

  const renderTask = (
    task: any,
    color: string
  ) => (
    <View
      key={task.id}
      style={[
        styles.card,
        { backgroundColor: color },
      ]}
    >
      <TouchableOpacity
        onPress={() => toggleTask(task.id)}
      >
        <Ionicons
          name={
            task.completed
              ? 'checkbox'
              : 'square-outline'
          }
          size={24}
          color="#333"
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>
          {task.title}
        </Text>

        <Text style={styles.taskDesc}>
          {task.description}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/addtask',
            params: {
              taskId: task.id,
            },
          })
        }
      >
        <Ionicons
          name="create-outline"
          size={22}
          color="#444"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          deleteTask(task.id)
        }
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color="#E74C3C"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      <Text style={styles.heading}>
        Hi Smriti 👋
      </Text>

      <Text style={styles.section}>
        HIGH PRIORITY
      </Text>

      {highTasks.map(task =>
        renderTask(task, COLORS.high)
      )}

      <Text style={styles.section}>
        MEDIUM PRIORITY
      </Text>

      {mediumTasks.map(task =>
        renderTask(task, COLORS.medium)
      )}

      <Text style={styles.section}>
        LOW PRIORITY
      </Text>

      {lowTasks.map(task =>
        renderTask(task, COLORS.low)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F6',
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 25,
  },

  section: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 16,

    borderRadius: 18,

    marginBottom: 12,

    gap: 12,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  taskDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});