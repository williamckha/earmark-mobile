import 'react-native-gesture-handler';

import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { store } from './app/store';
import { AccountsStackScreen } from './components/screens/AccountsScreen';
import { BudgetStackScreen } from './components/screens/BudgetScreen';
import { AddTransactionScreen, TransactionModal } from './components/transaction-modal/TransactionModal';
import { GlobalStyles } from './constants/GlobalStyles';

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  const transactionModalRef = useRef<TransactionModal>(null);
  const handlePresentModalPress = useCallback(() => {
    transactionModalRef.current?.present();
  }, []);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarInactiveTintColor: "gray",
                headerShown: false
              })}
            >
              <Tab.Screen name="BudgetStack" component={BudgetStackScreen} options={{ title: "Budget" }} />
              <Tab.Screen 
                name="AddTransaction" 
                component={AddTransactionScreen} 
                options={{ tabBarButton: (props) => (
                  <TouchableOpacity style={{ alignItems: "center" }} onPress={handlePresentModalPress}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={24} color={"gray"} style={{ paddingBottom: 1 }} />
                    <Text style={[styles.tabBarLabel, { color: "gray" }]}>{"Transaction"}</Text>
                  </TouchableOpacity>
                )}}
              />
              <Tab.Screen name="AccountsStack" component={AccountsStackScreen} options={{ title: "Accounts" }} />
            </Tab.Navigator>
          </NavigationContainer>
          <TransactionModal ref={transactionModalRef}/>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    padding: 10, 
    height: 60
  },
  tabBarLabel: {
    ...GlobalStyles.fontRegular, 
    paddingBottom: 10, 
    fontSize: 10
  }
})

registerRootComponent(App);
