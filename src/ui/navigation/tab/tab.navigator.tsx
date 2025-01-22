import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabParams, Screen } from '../types';
import FavoritesScreen from '../../screens/favorites/favorites.screen';
import HomeScreen from '../../screens/home/home.screen';


const Tab = createBottomTabNavigator<TabParams>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused }) => {
            let iconName: 'home' | 'heart' = 'home'; 
          
            if (route.name === Screen.Home) {
              iconName = 'home';
            } else if (route.name === Screen.Favorites) {
              iconName = 'heart';
            }
          
            return <Ionicons name={iconName} size={24} color={focused ? '#FFFFFF' : '#D3D3D3'} />;
          },
      })}>
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
