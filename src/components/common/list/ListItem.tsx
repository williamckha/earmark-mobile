import { Text, View, StyleSheet, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { GlobalStyles } from '../../../constants/GlobalStyles';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ListItemProps = {
  index: number,
  title?: string,
  showChevron?: boolean,
  showCheckmark?: boolean,
  onPress?: () => void
}

export const ListItem = (props: ListItemProps) => {
  const { showChevron = false, showCheckmark = false } = props;

  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
    >
      <View 
        style={[
          styles.sectionRow, 
          (props.index == 0) ? { borderTopWidth: 0 } : { borderTopWidth: 0.5 },
        ]}
      >
        <Text
          style={[
            GlobalStyles.fontRegular,
          ]}
        >{props.title}</Text>
        {showChevron && <MaterialCommunityIcons name="chevron-right" size={22} color={"gray"} />}
        {showCheckmark && <MaterialCommunityIcons name="check" size={22} color={"gray"} />}
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  sectionRow: {
    backgroundColor: "white",
    borderColor: "lightgray",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})