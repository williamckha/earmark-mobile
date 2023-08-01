import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { TransactionModalBackdrop } from './TransactionModalBackdrop';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationOptions, TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { TransactionMainScreen } from './TransactionMainScreen';
import { TransactionPayeeScreen } from './TransactionPayeeScreen';
import { TransactionCategoryScreen } from './TransactionCategoryScreen';

export type TransactionModal = BottomSheetModal;
export type TransactionModalProps = Omit<BottomSheetModalProps, "snapPoints" | "children">;

const TransactionStack = createStackNavigator();

export const TransactionNavigator = () => {
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      safeAreaInsets: { top: 0 },
      headerShown: true,
      headerTitleStyle: { ...GlobalStyles.fontBold, fontSize: 20 },
      headerStyle: { borderColor: "lightgray", borderBottomWidth: 0.5 }
    }), []
  );

  return (
    <NavigationContainer independent={true}>
      <TransactionStack.Navigator screenOptions={screenOptions} initialRouteName="TransactionMainScreen">
        <TransactionStack.Screen 
          name="TransactionMainScreen" 
          component={TransactionMainScreen} 
          options={{
            headerShown: false
          }}
        />
        <TransactionStack.Screen 
          name="TransactionPayeeScreen" 
          component={TransactionPayeeScreen}
          options={{
            headerTitle: "Payee"
          }}
        />
        <TransactionStack.Screen 
          name="TransactionCategoryScreen" 
          component={TransactionCategoryScreen}
          options={{
            headerTitle: "Category"
          }}
        />
      </TransactionStack.Navigator>
    </NavigationContainer>
  );
}

export const TransactionModal = forwardRef<
  BottomSheetModal, TransactionModalProps
>((props, ref) => {
  
  const snapPoints = useMemo(() => ['60%'], []);

  const [backdropPressBehavior, setBackdropPressBehavior] = useState<
    'none' | 'close' | 'collapse'
  >('collapse');
  
  const renderBackdrop = useCallback(
    props => (
      <TransactionModalBackdrop {...props} pressBehavior={backdropPressBehavior} />
    ),
    [backdropPressBehavior]
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      style={styles.bottomSheet}
      handleIndicatorStyle={{ backgroundColor: "lightgray" }}
      backdropComponent={renderBackdrop}
    >
      <TransactionNavigator />
    </BottomSheetModal>
  );
})

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
})

export const AddTransactionScreen = () => { return null; }
