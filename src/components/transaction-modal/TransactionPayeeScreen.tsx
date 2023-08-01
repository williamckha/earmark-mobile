import { Text, FlatList, StyleSheet, View } from "react-native";
import { ListItem } from "../common/list/ListItem";
import { useGetPayeesQuery } from "../../app/api/payee";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { NoItemsIndicator } from "../common/NoItemsIndicator";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { SelectionList } from "./SelectionList";
import { useState } from "react";

export const TransactionPayeeScreen = () => {
  const { data: payees, isLoading } = useGetPayeesQuery();

  const [selectedPayeeId, setSelectedPayeeId] = useState(null);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!payees || !payees.length) {
    return <NoItemsIndicator text={"No payees"} />;
  }
  
  return (
    <SelectionList
      data={payees} 
      setSelected={setSelectedPayeeId}
    />
  );
}