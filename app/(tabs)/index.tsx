import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TaskContext';
import { router } from 'expo-router';

// Premium Deep Dark Mode Palette
const COLORS = {
  background: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1D1D1D',
  pink: '#e28087',
  pinkDim: 'rgba(226, 128, 135, 0.15)',
  green: '#7FA381',
  textMain: '#FFFFFF',
  textMuted: '#8E8E93',
  border: '#1F1F1F',
};

const PRIORITY_COLORS = {
  high: '#FF5C5C',
  medium: '#5C9DFF',
  low: '#E6C64F',
};

type FilterType = 'ALL' | 'PENDING' | 'COMPLETED';

export default function HomeScreen() {
  const { tasks, deleteTask, toggleTask } = useTasks();
  // State tracking the active filter selection
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  // 1. First, apply the status filter (All, Pending, or Completed)
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'PENDING') return !task.completed;
    if (activeFilter === 'COMPLETED') return task.completed;
    return true; // 'ALL'
  });

  // 2. Then group the filtered results by priority
  const highTasks = filteredTasks.filter(t => t.priority === 'HIGH');
  const mediumTasks = filteredTasks.filter(t => t.priority === 'MEDIUM');
  const lowTasks = filteredTasks.filter(t => t.priority === 'LOW');

  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  const renderTask = (task: any, priorityColor: string) => (
    <TouchableOpacity
      key={task.id}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: '/taskdetails',
          params: {
            taskId: task.id,
          },
        })
      }
      style={[
        styles.card,
        task.completed &&
        styles.completedCard,
      ]}
    >


      <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />

      <TouchableOpacity
        onPress={() => toggleTask(task.id)}
        style={styles.checkboxContainer}
      >
        <Ionicons
          name={task.completed ? 'checkbox' : 'square-outline'}
          size={22}
          color={task.completed ? priorityColor : COLORS.textMuted}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.completedText
          ]}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text
            style={[
              styles.taskDesc,
              task.completed && styles.completedText
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            router.navigate({
              pathname: '/addtask',
              params: { taskId: task.id },
            })
          }
        >
          <Ionicons
            name="create-outline"
            size={18}
            color={COLORS.pink}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => deleteTask(task.id)}
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color="#FF5C5C"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>);

  return (
    <View style={styles.mainWrapper}>
      {/* Pink Header */}
      <View style={styles.appHeader}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.heading}>Hi Smriti 👋</Text>
            <Text style={styles.subHeading}>
              {tasks.filter(t => !t.completed).length} Tasks remaining today
            </Text>
          </View>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>{formattedDate}</Text>
          </View>
        </View>
      </View>

      {/* Interactive, High-Contrast Filter Chips */}
      <View style={styles.dateStripContainer}>
        <TouchableOpacity
          style={[styles.dateStripPill, activeFilter === 'ALL' && styles.activeDatePill]}
          onPress={() => setActiveFilter('ALL')}
        >
          <Text style={activeFilter === 'ALL' ? styles.activeDateText : styles.inactiveDateText}> All </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dateStripPill, activeFilter === 'PENDING' && styles.activeDatePill]}
          onPress={() => setActiveFilter('PENDING')}
        >
          <Text style={activeFilter === 'PENDING' ? styles.activeDateText : styles.inactiveDateText}> Pending </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dateStripPill, activeFilter === 'COMPLETED' && styles.activeDatePill]}
          onPress={() => setActiveFilter('COMPLETED')}
        >
          <Text style={activeFilter === 'COMPLETED' ? styles.activeDateText : styles.inactiveDateText}> Completed </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.section}>HIGH PRIORITY</Text>
        {highTasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks found here ✨</Text>
        ) : (
          highTasks.map(task => renderTask(task, PRIORITY_COLORS.high))
        )}

        <Text style={styles.section}>MEDIUM PRIORITY</Text>
        {mediumTasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks found here 🌸</Text>
        ) : (
          mediumTasks.map(task => renderTask(task, PRIORITY_COLORS.medium))
        )}

        <Text style={styles.section}>LOW PRIORITY</Text>
        {lowTasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks found here 🎈</Text>
        ) : (
          lowTasks.map(task => renderTask(task, PRIORITY_COLORS.low))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appHeader: {
    backgroundColor: COLORS.pink,
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 35,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subHeading: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
    fontWeight: '500',
  },
  datePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  datePillText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  dateStripContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 12,
  },
  dateStripPill: {
    flex: 1, // Distributes space evenly across the screen width
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDatePill: {
    backgroundColor: COLORS.pink, // Solid high-contrast pink background for visibility
    borderColor: COLORS.pink,
  },
  activeDateText: {
    color: '#FFFFFF', // Crisp white text over active color
    fontWeight: '800',
    fontSize: 13,
  },
  inactiveDateText: {
    color: COLORS.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 140,
  },
  section: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.green,
    marginBottom: 12,
    marginTop: 22,
    letterSpacing: 1.2,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginLeft: 4,
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
    overflow: 'hidden',
  },
  completedCard: {
    opacity: 0.35,
    backgroundColor: '#0F0F0F',
  },
  priorityIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  checkboxContainer: {
    paddingRight: 6,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  taskDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 3,
    lineHeight: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#555555',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
});