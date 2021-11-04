import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './screens/Home';
import { Cart } from './screens/Cart';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
