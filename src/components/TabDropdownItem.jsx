import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./TabsComponent";

const TabDropdownItem = ({ tab, index, onTabDrop, onPinToggle, onClose }) => {
  const [, dragRef] = useDrag({
    type: ItemTypes.TAB,
    item: { tab, index },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onTabDrop(item.index);
      }
    },
  });

  return (
    <li ref={dragRef} className="dropdown-item">
      <span>{tab.title}</span>
      <button onClick={() => onPinToggle(index)}>
        {tab.isPinned ? "Unpin" : "Pin"}
      </button>
      <button onClick={() => onClose(index)}>Close</button>
    </li>
  );
};

export default TabDropdownItem;
