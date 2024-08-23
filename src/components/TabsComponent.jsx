import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tab from "./Tab";
import usePersistentState from "../hooks/usePersistentState";

export const ItemTypes = {
  TAB: "tab",
};

const TabsComponent = () => {
  const [tabs, setTabs] = usePersistentState("tabs", initialTabs);
  const [newTabTitle, setNewTabTitle] = useState("");

  const moveTab = (fromIndex, toIndex) => {
    const updatedTabs = [...tabs];
    const [movedTab] = updatedTabs.splice(fromIndex, 1);
    updatedTabs.splice(toIndex, 0, movedTab);
    setTabs(updatedTabs);
  };

  const togglePin = (index) => {
    const updatedTabs = tabs.map((tab, i) =>
      i === index ? { ...tab, isPinned: !tab.isPinned } : tab
    );
    setTabs(updatedTabs);
  };

  const handleAddTab = () => {
    if (newTabTitle.trim()) {
      const newTab = {
        id: Date.now(), // Генерація унікального ID
        title: newTabTitle,
        isPinned: false,
      };
      setTabs([...tabs, newTab]);
      setNewTabTitle(""); // Очистити поле введення
    }
  };

  const handleCloseTab = (index) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            tab={tab}
            index={index}
            isPinned={tab.isPinned}
            moveTab={moveTab}
            onPinToggle={togglePin}
            onClose={handleCloseTab}
          />
        ))}
      </div>
      <div className="tab-controls">
        <input
          type="text"
          value={newTabTitle}
          onChange={(e) => setNewTabTitle(e.target.value)}
          placeholder="Enter tab title"
        />
        <button onClick={handleAddTab}>Add Tab</button>
      </div>
    </DndProvider>
  );
};

const initialTabs = [
  { id: 1, title: "Tab 1", isPinned: false },
  { id: 2, title: "Tab 2", isPinned: true },
  // Додайте більше вкладок тут
];

export default TabsComponent;
