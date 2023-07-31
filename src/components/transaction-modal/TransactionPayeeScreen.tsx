import { Text, FlatList, StyleSheet, View } from "react-native";
import { ListItem } from "../common/ListItem";
import { useGetPayeesQuery } from "../../app/api/payee";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { NoItemsIndicator } from "../common/NoItemsIndicator";

export const TransactionPayeeScreen = () => {
  const { data: payees, isLoading } = useGetPayeesQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!payees || !payees.length) {
    return <NoItemsIndicator text={"No payees"} />;
  }
  
  return (
    <View>
      <FlatList 
        data={payees}
        keyExtractor={(payee) => payee.id.toString()}
        renderItem={({ item: payee, index }) => (
          <ListItem 
            index={index} 
            title={payee.name} 
          />
        )}
      />
    </View>
  );
}