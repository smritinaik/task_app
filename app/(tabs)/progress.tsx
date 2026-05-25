import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useTasks } from '../context/TaskContext';

const COLORS = {
  background: '#FFF8F6',

  pink: '#FFD6D6',
  blue: '#DCEBFF',
  yellow: '#FFF4C9',

  green: '#D8F5D0',

  dark: '#2F2F2F',
};

export default function ProgressScreen() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) *
            100
        );

  const highLeft = tasks.filter(
    task =>
      task.priority === 'HIGH' &&
      !task.completed
  ).length;

  const mediumLeft = tasks.filter(
    task =>
      task.priority === 'MEDIUM' &&
      !task.completed
  ).length;

  const lowLeft = tasks.filter(
    task =>
      task.priority === 'LOW' &&
      !task.completed
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      <Text style={styles.heading}>
        Progress 📊
      </Text>

      {/* Progress Circle */}
      <View style={styles.circleCard}>
        <View style={styles.circle}>
          <Text style={styles.percent}>
            {progress}%
          </Text>
        </View>

        <Text style={styles.progressText}>
          Overall Completion
        </Text>

        <Text style={styles.subText}>
          {completedTasks} of {totalTasks}{' '}
          tasks completed
        </Text>
      </View>

      {/* Stats Cards */}

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              COLORS.pink,
          },
        ]}
      >
        <Text style={styles.cardTitle}>
          High Priority Left
        </Text>

        <Text style={styles.cardValue}>
          {highLeft}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              COLORS.blue,
          },
        ]}
      >
        <Text style={styles.cardTitle}>
          Medium Priority Left
        </Text>

        <Text style={styles.cardValue}>
          {mediumLeft}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              COLORS.yellow,
          },
        ]}
      >
        <Text style={styles.cardTitle}>
          Low Priority Left
        </Text>

        <Text style={styles.cardValue}>
          {lowLeft}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              COLORS.green,
          },
        ]}
      >
        <Text style={styles.cardTitle}>
          Completed Tasks
        </Text>

        <Text style={styles.cardValue}>
          {completedTasks}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.dark,
    marginTop: 50,
    marginBottom: 25,
  },

  circleCard: {
    backgroundColor: '#fff',

    borderRadius: 24,

    padding: 24,

    alignItems: 'center',

    marginBottom: 24,
  },

  circle: {
    width: 150,
    height: 150,

    borderRadius: 75,

    borderWidth: 12,

    borderColor: '#E89A9F',

    justifyContent: 'center',
    alignItems: 'center',
  },

  percent: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.dark,
  },

  progressText: {
    fontSize: 18,
    fontWeight: '700',

    marginTop: 18,
  },

  subText: {
    color: '#666',
    marginTop: 6,
  },

  card: {
    borderRadius: 22,

    padding: 20,

    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },

  cardValue: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
    color: COLORS.dark,
  },
});