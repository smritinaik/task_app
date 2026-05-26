import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TaskContext';

const COLORS = {
  background: '#0A0A0A',
  surface: '#141414',
  border: '#1F1F1F',
  pink: '#e28087',
  green: '#7FA381',
  textMain: '#FFFFFF',
  textMuted: '#8E8E93',
};

const PRIORITY_COLORS = {
  high: '#FF5C5C',   
  medium: '#5C9DFF', 
  low: '#E6C64F',    
};

export default function ProgressScreen() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Fallback filtering to capture any task missing an explicit valid priority tag
  const highLeft = tasks.filter(task => task.priority === 'HIGH' && !task.completed).length;
  const lowLeft = tasks.filter(task => task.priority === 'LOW' && !task.completed).length;
  
  // Medium acts as the safe default collector for unassigned tasks
  const mediumLeft = tasks.filter(task => {
    const isUncompleted = !task.completed;
    const isMediumOrMissing = task.priority === 'MEDIUM' || (!task.priority || (task.priority !== 'HIGH' && task.priority !== 'LOW'));
    return isUncompleted && isMediumOrMissing;
  }).length;

  // Inline styling for the native circular layout mask engine
  const dynamicConicExpress = {
    backgroundImage: `conic-gradient(${COLORS.pink} 0% ${progress}%, ${COLORS.border} ${progress}% 100%)`
  };

  return (
    <View style={styles.mainWrapper}>
      {/* Header Section */}
      <View style={styles.appHeader}>
        <View style={styles.headerContentRow}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.heading}>Progress Report</Text>
            <Text style={styles.subHeading}>Keep tracking your daily focus</Text>
          </View>
          <View style={styles.trophyBadge}>
            <Ionicons name="trophy" size={26} color="#E6C64F" />
          </View>
        </View>
      </View>

      {/* Main Stats Scroll View */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <View style={styles.circleCard}>
          
          {/* HIGH-PERFORMANCE PIXEL-PERFECT ACCURATE GRADIENT RING */}
          <View style={[styles.pureChartContainer, dynamicConicExpress]}>
            {/* Center Mask Content Hole - Leaves a crisp outer track */}
            <View style={styles.innerMaskCoreCard}>
              <Text style={styles.percent}>{progress}%</Text>
            </View>
          </View>

          <Text style={styles.progressText}>Overall Completion</Text>
          <Text style={styles.subText}>
            {completedTasks} of {totalTasks} tasks completed
          </Text>
        </View>

        {/* Breakdown Section Title */}
        <Text style={styles.sectionTitle}>TASK BREAKDOWN</Text>

        {/* Priority Status Cards */}
        <View style={styles.card}>
          <View style={[styles.priorityIndicator, { backgroundColor: PRIORITY_COLORS.high }]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>High Priority Left</Text>
            <Text style={styles.cardValue}>{highLeft}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.priorityIndicator, { backgroundColor: PRIORITY_COLORS.medium }]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Medium Priority Left</Text>
            <Text style={styles.cardValue}>{mediumLeft}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.priorityIndicator, { backgroundColor: PRIORITY_COLORS.low }]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Low Priority Left</Text>
            <Text style={styles.cardValue}>{lowLeft}</Text>
          </View>
        </View>

        {/* Total Tasks Completed Summary Card */}
        <View style={[styles.card, { borderColor: COLORS.pink }]}>
          <View style={[styles.priorityIndicator, { backgroundColor: COLORS.pink }]} />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: COLORS.pink, fontWeight: '800' }]}>Total Tasks Completed</Text>
            <Text style={[styles.cardValue, { color: COLORS.pink }]}>{completedTasks}</Text>
          </View>
        </View>
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
  headerContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextGroup: {
    flex: 1,
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
  trophyBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 140, 
  },
  circleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 10,
  },
  pureChartContainer: {
    width: 140,
    height: 140,
    borderRadius: 70, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    position: 'relative',
  },
  innerMaskCoreCard: {
    width: 120, 
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percent: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
    marginTop: 18,
  },
  subText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.green,
    marginBottom: 14,
    marginTop: 22,
    letterSpacing: 1.2,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  priorityIndicator: {
    width: 6,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textMain,
  },
});