import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store';

import "react-native-gesture-handler"

import Home from './screens/Home';
import Map from './screens/Map';
import Eats from './screens/Eats';

// Redux - introduces a new data layer for the application which can be used to pull and push information.

export default function App() {
  // Stack - introduces a stack of application screens that will allow us to swipe to quickly navigate back and forth between layers.
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          {/* Implement keyboard avoiding view for better user experience. Take into account the current OS for different behaviors. */}
          <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Map"
                component={Map}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Eats"
                component={Eats}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
