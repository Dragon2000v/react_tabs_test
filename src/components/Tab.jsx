import React, { forwardRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes, iconComponents } from "./TabsComponent";

const Tab = forwardRef(
  ({ tab, index, isPinned, moveTab, onPinToggle, onClose }, ref) => {
    const [, dragRef] = useDrag({
      type: ItemTypes.TAB,
      item: { index },
      canDrag: !isPinned,
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

    const Icon = iconComponents[tab.icon] || null;

    return (
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`tab ${isPinned ? "pinned" : ""}`}
        data-id={tab.id}
      >
        {Icon && <Icon className="tab-icon" />}
        <span className="tab-title">{tab.title}</span>
        <button className="pin-button" onClick={() => onPinToggle(index)}>
          {isPinned ? "Unpin" : "Pin"}
        </button>
        <button className="close-button" onClick={() => onClose(index)}>
          Close
        </button>
      </div>
    );
  }
);

export default Tab;
