import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetFlatListProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { ListItem } from "../common/list/ListItem";
import { useCallback, useState } from "react";

type SelectionListProps = {
  data: { id: number, name: string }[],
  setSelected?: (id: number) => void 
}

export const SelectionList = (props: SelectionListProps) => {

  const [selectedId, setSelectedId] = useState(null);


  return (
    <BottomSheetFlatList
      data={props.data}
      keyExtractor={(category) => category.id.toString()}
      renderItem={({ item, index }) => (
        <ListItem 
          index={index} 
          title={item.name} 
          showCheckmark={item.id === selectedId}
          onPress={() => {
            setSelectedId(item.id);
            props.setSelected && props.setSelected(item.id);
          }}
        />
      )}
    />
  );
}