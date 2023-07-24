import { ActivityIndicator, View } from "react-native"

export const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={"lightgray"} />
    </View>
  )
}
