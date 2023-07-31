import { Text, FlatList, StyleSheet, View } from "react-native";
import { useGetCategoriesQuery } from "../../app/api/category";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { ListItem } from "../common/ListItem";
import { NoItemsIndicator } from "../common/NoItemsIndicator";

export const TransactionCategoryScreen = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!categories || !categories.length) {
    return <NoItemsIndicator text={"No categories"} />;
  }
  
  return (
    <View>
      <FlatList 
        data={categories}
        keyExtractor={(category) => category.id.toString()}
        renderItem={({ item: category, index }) => (
          <ListItem 
            index={index} 
            title={category.name} 
          />
        )}
      />
    </View>
  );
}