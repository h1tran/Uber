import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import MapUnit from '../components/MapUnit';

import tw from 'twrnc';

const Map = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <TouchableOpacity
        style={tw`absolute top-16 left-6 z-50 p-3 shadow-lg rounded-full bg-gray-100`}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="menu"/>
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <MapUnit />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default Map;
