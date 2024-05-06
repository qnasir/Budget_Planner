import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router'

export default function HomeLayout() {

  const [fontLoaded, fontError] =  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf')
  });
  
  return (
    <Stack screenOptions={{
        headerShown: false
    }} >
      <Stack.Screen name='(tabs)' 
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

