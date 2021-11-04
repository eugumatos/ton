import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Anton_400Regular } from '@expo-google-fonts/anton';

import { Header } from './src/components/Header';
import { CartProvider } from './src/hooks/useCart';
import { Routes } from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Anton_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style="auto" />
      <CartProvider>
        <Routes />
      </CartProvider>
    </>
  );
}
