import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from './context/TaskContext';

const COLORS = {
  background: '#0A0A0A',
  surface: '#141414',
  border: '#1F1F1F',

  textMain: '#FFFFFF',
  textMuted: '#8E8E93',

  pink: '#E28087',

  high: '#FF5C5C',
  medium: '#5C9DFF',
  low: '#E6C64F',
};

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams();

  const { tasks } = useTasks();

  const task = tasks.find(
    item => item.id === taskId
  );

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Task not found
        </Text>
      </View>
    );
  }

  const priorityColor =
    task.priority === 'HIGH'
      ? COLORS.high
      : task.priority === 'MEDIUM'
      ? COLORS.medium
      : COLORS.low;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 60,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Navigation Line */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={COLORS.textMain}
          />
        </TouchableOpacity>
      </View>

      {/* Sleek, Transparent Priority Badge */}
      <View
        style={[
          styles.priorityBadge,
          {
            borderColor: `${priorityColor}40`,
            backgroundColor: `${priorityColor}10`,
          },
        ]}
      >
        <View style={[styles.badgeDot, { backgroundColor: priorityColor }]} />
        <Text style={[styles.priorityText, { color: priorityColor }]}>
          {task.priority}
        </Text>
      </View>

      {/* Master Task Box: Title & Description combined with lighting border */}
      <View 
        style={[
          styles.masterTaskCard, 
          { borderColor: `${priorityColor}35` }
        ]}
      >
        <Text style={styles.title}>
          {task.title}
        </Text>
        
        <View style={styles.cardDivider} />
        
        <Text style={styles.sectionLabel}>DESCRIPTION</Text>
        <Text style={styles.description}>
          {task.description || 'No description provided'}
        </Text>
      </View>

      {/* Status Section (Kept completely outside the master box) */}
      <Text style={styles.section}>
        STATUS
      </Text>
      <View style={styles.statusLine}>
        <Ionicons
          name={
            task.completed
              ? 'checkmark-circle'
              : 'time-outline'
          }
          size={18}
          color={
            task.completed
              ? '#4CAF50'
              : '#E6C64F'
          }
        />
        <Text style={styles.statusText}>
          {task.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 28,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  notFound: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: '500',
  },

  header: {
    marginTop: 60,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  priorityBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 24,
    gap: 6,
  },

  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  masterTaskCard: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1.5,
    marginBottom: 35,
  },

  title: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.5,
  },

  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },

  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  description: {
    color: '#D1D1D6',
    fontSize: 15,
    lineHeight: 24,
  },

  section: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },

  statusText: {
    color: COLORS.textMain,
    fontWeight: '600',
    fontSize: 14,
  },
});