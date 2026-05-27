import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity,
} from 'react-native';

const COLORS = {
  cream: '#F8F5EF',
  card: '#fbe2e2',
  pink: '#e28087',
  pinkLight: '#F7D7DA',
  green: '#4E6B50',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          COLORS.pink,

        tabBarInactiveTintColor:
          COLORS.green,

        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 22,

          height: 75,

          borderRadius: 40,
          backgroundColor:
            COLORS.card,

          borderTopWidth: 0,

          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 20,
          shadowOffset: {
            width: 0,
            height: 10,
          },

          elevation: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 6,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? 'home'
                  : 'home-outline'
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* ADD TASK */}
      <Tabs.Screen
        name="addtask"
        options={{
          title: '',

          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname:
                    '/addtask',
                })
              }
              style={{
                justifyContent:
                  'center',
                alignItems:
                  'center',
                marginTop: -30,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,

                  backgroundColor:
                    COLORS.pink,

                  justifyContent:
                    'center',

                  alignItems:
                    'center',

                  shadowColor: '#000',
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },

                  elevation: 8,
                }}
              >
                <Ionicons
                  name="add"
                  size={34}
                  color="#FFFFFF"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      {/* PROGRESS */}
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? 'bar-chart'
                  : 'bar-chart-outline'
              }
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}