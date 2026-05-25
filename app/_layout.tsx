import { Stack } from 'expo-router';
import { TaskProvider } from './context/TaskContext';
export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TaskProvider>
  );
}