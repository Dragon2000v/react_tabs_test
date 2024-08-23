import React, { forwardRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes, iconComponents } from "./TabsComponent";
import { IconButton, Tooltip } from "@mui/material";
import { PushPin, Close } from "@mui/icons-material";

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
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          margin: "0 5px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          cursor: "pointer",
          userSelect: "none",
          whiteSpace: "nowrap",
          flexShrink: 0, // Додає можливість табам не зменшуватися
        }}
      >
        {Icon && (
          <Icon
            className="tab-icon"
            style={{ marginRight: "8px", fontSize: "18px" }}
          />
        )}
        <span className="tab-title" style={{ flexGrow: 1 }}>
          {tab.title}
        </span>
        <Tooltip title={isPinned ? "Unpin" : "Pin"}>
          <IconButton
            className="pin-button"
            onClick={() => onPinToggle(index)}
            size="small"
            style={{ marginLeft: "8px" }}
          >
            <PushPin color={isPinned ? "primary" : "action"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close">
          <IconButton
            className="close-button"
            onClick={() => onClose(index)}
            size="small"
            style={{ marginLeft: "8px" }}
          >
            <Close color="error" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
);

export default Tab;
