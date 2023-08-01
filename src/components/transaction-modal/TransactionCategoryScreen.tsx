import { Text, FlatList, StyleSheet, View } from "react-native";
import { useGetCategoriesQuery } from "../../app/api/category";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { ListItem } from "../common/list/ListItem";
import { NoItemsIndicator } from "../common/NoItemsIndicator";
import { SelectionList } from "./SelectionList";

export const TransactionCategoryScreen = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!categories || !categories.length) {
    return <NoItemsIndicator text={"No categories"} />;
  }
  
  return (
    <SelectionList
      data={categories} 
    />
  );
}