import * as React from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const BudgetStack = createNativeStackNavigator();

export const BudgetStackScreen = () => {
  return (
    <BudgetStack.Navigator screenOptions={{
      headerShown: true,
      headerTitleStyle: { ...GlobalStyles.fontBold, fontSize: 20 }
    }}>
      <BudgetStack.Screen name="Budget" component={BudgetScreen} />
    </BudgetStack.Navigator>
  )
}

export const BudgetScreen = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    sectionHeader: {
      backgroundColor: colors.background,
      color: colors.text,
      borderColor: colors.border,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      paddingHorizontal: 16,
      paddingVertical: 12
    },
    sectionRow: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 12
    }
  })

  return (
    <View>
      <SectionList
        stickySectionHeadersEnabled
        sections={[{ title: "Lorem ipsum", data: ["Test", "Test"] }]}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[GlobalStyles.fontSemiBold, styles.sectionHeader]}>{title}</Text>
        )}
        renderItem={({ item, index }) => (
          <Text
            style={[
              GlobalStyles.fontRegular,
              styles.sectionRow,
              (index == 0) ? { borderTopWidth: 0 } : { borderTopWidth: 0.5 }
            ]}
          >{item}</Text>
        )}
      />
    </View>
  );
}
