import { View, Text } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";

export const NoItemsIndicator = ({ text }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={[GlobalStyles.fontMedium, { color: "dimgray" }]}>
        {text}
      </Text>
    </View>
  );
}