import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      'TASKS',
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem('TASKS');

    if (data) {
      setTasks(JSON.parse(data));
    }
  };

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      'useTasks must be inside TaskProvider'
    );
  }

  return context;
};