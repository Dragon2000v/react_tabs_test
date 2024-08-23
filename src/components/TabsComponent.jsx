import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  TAB: "tab",
};

const Tab = ({ tab, index, moveTab }) => {
  const [, ref] = useDrag({
    type: ItemTypes.TAB,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TAB,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTab(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="tab">
      {tab.title}
    </div>
  );
};

const TabsComponent = () => {
  const [tabs, setTabs] = React.useState(initialTabs);

  const moveTab = (fromIndex, toIndex) => {
    const updatedTabs = [...tabs];
    const [movedTab] = updatedTabs.splice(fromIndex, 1);
    updatedTabs.splice(toIndex, 0, movedTab);
    setTabs(updatedTabs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <Tab key={tab.id} tab={tab} index={index} moveTab={moveTab} />
        ))}
      </div>
    </DndProvider>
  );
};

const initialTabs = [
  { id: 1, title: "Tab 1" },
  { id: 2, title: "Tab 2" },
  // Add more initial tabs here
];

export default TabsComponent;
