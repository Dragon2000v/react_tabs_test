import React, { forwardRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./TabsComponent";

const Tab = forwardRef(
  ({ tab, index, isPinned, moveTab, onPinToggle, onClose }, ref) => {
    const [, dragRef] = useDrag({
      type: ItemTypes.TAB,
      item: { index },
      canDrag: !isPinned, //
    });

    const [, dropRef] = useDrop({
      accept: ItemTypes.TAB,
      hover: (draggedItem) => {
        if (draggedItem.index !== index && !isPinned) {
          moveTab(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`tab ${isPinned ? "pinned" : ""}`}
      >
        
        {tab.title}
        <button onClick={() => onPinToggle(index)} className="pin-button">
          {isPinned ? "Unpin" : "Pin"}
        </button>
        <button onClick={() => onClose(index)} className="close-button">
          ✕
        </button>
      </div>
    );
  }
);

export default Tab;
