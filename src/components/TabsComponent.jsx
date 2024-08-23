import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tab from "./Tab";
import TabDropdown from "./TabDropdown";
import usePersistentState from "../hooks/usePersistentState";

const TabsComponent = () => {
  const [tabs, setTabs] = usePersistentState("tabs", initialTabs);
  const [pinnedTabs, setPinnedTabs] = usePersistentState("pinnedTabs", []);
  const [overflowTabs, setOverflowTabs] = useState([]);

  useEffect(() => {
    // Логика для обновления overflowTabs на основе видимости
    updateOverflowTabs();
  }, [tabs, pinnedTabs]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    // Логика перетаскивания табов, исключающая перемещение между закрепленными и незакрепленными
  };

  const updateOverflowTabs = () => {
    // Логика для вычисления табов, которые не помещаются в видимую область
  };

  return (
    <div className="tabs-container">
      <div className="pinned-tabs">
        {pinnedTabs.map((tab, index) => (
          <Tab key={tab.id} tab={tab} isPinned />
        ))}
      </div>
      <div className="scrollable-tabs">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabs">
            {(provided) => (
              <div
                className="tabs-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tabs.map((tab, index) => (
                  <Draggable
                    key={tab.id}
                    draggableId={tab.id.toString()}
                    index={index}
                    isDragDisabled={tab.isPinned}
                  >
                    {(provided) => (
                      <Tab
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        tab={tab}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <TabDropdown overflowTabs={overflowTabs} />
    </div>
  );
};

const initialTabs = [
  { id: 1, title: "Tab 1", isPinned: false },
  { id: 2, title: "Tab 2", isPinned: false },
  // Add more initial tabs here
];

export default TabsComponent;
