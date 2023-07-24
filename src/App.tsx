import * as React from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { Provider } from "react-redux";
import { store } from './app/store';

import { GlobalStyles } from './constants/GlobalStyles';
import { BudgetScreen, BudgetStackScreen } from './screens/BudgetScreen';
import { AccountsStackScreen } from './screens/AccountsScreen';
import { useRef } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={colorScheme == "dark" ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name == "BudgetStack") {
                iconName = focused ? "tag" : "tag-outline";
              } else if (route.name == "AccountsStack") {
                iconName = focused ? "bank" : "bank-outline";
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { ...GlobalStyles.fontRegular, paddingBottom: 10, fontSize: 10 },
            tabBarStyle: { padding: 10, height: 60 },
            headerShown: false
          })}
        >
          <Tab.Screen name="BudgetStack" component={BudgetStackScreen} options={{ title: "Budget" }} />
          <Tab.Screen name="AccountsStack" component={AccountsStackScreen} options={{ title: "Accounts" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
