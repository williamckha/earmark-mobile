import { useState } from "react";
import { Text, TextInput, View, StyleSheet, FlatList, TouchableHighlight, Button, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { ListItem } from "../common/list/ListItem";
import { DefaultTheme, useTheme } from "@react-navigation/native";

export const TransactionMainScreen = ({ navigation }) => {
  const [transactionAmount, setTransactionAmount] = useState("0.00");

  return (
    <View style={styles.container}>
      <View style={styles.transactionAmountInputContainer}>
        <TextInput
          style={[GlobalStyles.fontSemiBold, styles.transactionAmountInput]}
          value={transactionAmount}
          onChangeText={setTransactionAmount}
          keyboardType='numeric' 
        />
      </View>
      <FlatList 
        data={NavigationItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <ListItem 
            index={index} 
            title={item.title} 
            showChevron={true}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
      />
      <Pressable 
        style={({ pressed }) => [
          styles.addTransactionButton, 
          pressed ? styles.addTransactionButtonPressed : []
        ]}
      >
        <Text style={styles.addTransactionButtonText}>Save Transaction</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  transactionAmountInputContainer: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  transactionAmountInput: {
    fontSize: 32,
  },
  addTransactionButton: {
    backgroundColor: DefaultTheme.colors.primary,
    margin: 12,
    padding: 12,
    alignItems: "center",
    borderRadius: 8
  },
  addTransactionButtonPressed: {
    opacity: 0.6
  },
  addTransactionButtonText: {
    ...GlobalStyles.fontSemiBold,
    color: "white"
  }
})

const NavigationItems = [
  {
    title: "Payee",
    route: "TransactionPayeeScreen"
  },
  {
    title: "Category",
    route: "TransactionCategoryScreen"
  },
  {
    title: "Account",
    route: ""
  },
  {
    title: "Date",
    route: ""
  }
]