import { useState } from "react";
import { Text, TextInput, View, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { ListItem } from "../common/ListItem";

export const TransactionMainScreen = ({ navigation }) => {
  const [transactionAmount, setTransactionAmount] = useState("0.00");

  return (
    <View>
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
        keyExtractor={(item) => item.id}
        style={styles.navigationFlatList}
        renderItem={({ item, index }) => (
          <ListItem 
            index={index} 
            title={item.title} 
            showChevron={true}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  transactionAmountInputContainer: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "white"
  },
  transactionAmountInput: {
    fontSize: 32,
  },
  navigationFlatList: {
    borderColor: "lightgray",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  }
})

const NavigationItems = [
  {
    id: "1",
    title: "Payee",
    route: "TransactionPayeeScreen"
  },
  {
    id: "2",
    title: "Category",
    route: "TransactionCategoryScreen"
  },
  {
    id: "3",
    title: "Account",
    route: "TransactionCategoryScreen"
  },
  {
    id: "4",
    title: "Date",
    route: "TransactionCategoryScreen"
  }
]