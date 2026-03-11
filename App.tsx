import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { User } from './src/types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator user={user} onLogin={handleLogin} />
    </SafeAreaProvider>
  );
}
