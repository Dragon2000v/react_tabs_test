import React, { useState, useEffect, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tab from "./Tab";
import usePersistentState from "../hooks/usePersistentState";
import TabDropdown from "./TabDropdown";
import { FaApple, FaBeer, FaHome, FaStar } from "react-icons/fa";
import { useId } from "react";

export const ItemTypes = {
  TAB: "tab",
};

const TabsComponent = () => {
  const [tabs, setTabs] = usePersistentState("tabs", initialTabs);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [overflowTabs, setOverflowTabs] = useState([]);
  const id = useId(); // Generate a unique ID

  const handleAddTab = () => {
    if (newTabTitle.trim() && selectedIcon) {
      const Icon = iconComponents[selectedIcon];
      if (Icon) {
        const newTab = {
          id: `${id}-${Date.now()}`, // Combine ID with timestamp
          title: newTabTitle,
          icon: selectedIcon,
          isPinned: false,
        };
        setTabs((prevTabs) => [...prevTabs, newTab]);
        setNewTabTitle("");
        setSelectedIcon("");
      } else {
        alert("Icon not found. Please check the icon name.");
      }
    }
  };

  const handleCloseTab = (index) => {
    setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
  };

  const moveTab = (fromIndex, toIndex) => {
    setTabs((prevTabs) => {
      const updatedTabs = [...prevTabs];
      const [movedTab] = updatedTabs.splice(fromIndex, 1);
      updatedTabs.splice(toIndex, 0, movedTab);
      return updatedTabs;
    });
  };

  const togglePin = (index) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) =>
        i === index ? { ...tab, isPinned: !tab.isPinned } : tab
      )
    );
  };

  const handleResize = () => {
    const container = document.querySelector(".tabs-container");
    const tabsList = document.querySelector(".tabs-list");
    const tabElements = Array.from(tabsList.children);
    const containerWidth = container.offsetWidth;
    let totalWidth = 0;
    let overflowTabs = [];

    if (!container || !tabsList) return;

    totalWidth = tabElements.reduce((acc, el) => acc + el.offsetWidth, 0);
    if (totalWidth > containerWidth) {
      let currentWidth = 0;
      overflowTabs = [];
      for (let i = 0; i < tabElements.length; i++) {
        currentWidth += tabElements[i].offsetWidth;
        if (currentWidth > containerWidth) {
          overflowTabs = tabElements.slice(i).map((el) => ({
            id: el.dataset.id,
            title: el.querySelector(".tab-title").innerText,
          }));
          break;
        }
      }
    }

    setOverflowTabs(overflowTabs);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabs]);

  const pinnedTabs = useMemo(() => tabs.filter((tab) => tab.isPinned), [tabs]);
  const scrollableTabs = useMemo(
    () => tabs.filter((tab) => !tab.isPinned),
    [tabs]
  );

  const handleTabDrop = (index) => {
    const tabToMove = overflowTabs[index];
    setTabs((prevTabs) => [
      ...prevTabs.filter((tab) => tab.id !== tabToMove.id),
      tabToMove,
    ]);
    setOverflowTabs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tabs-container">
        <div className="tabs-list">
          {pinnedTabs.map((tab, index) => (
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
          {scrollableTabs.map((tab, index) => (
            <Tab
              key={tab.id}
              tab={tab}
              index={index + pinnedTabs.length}
              isPinned={tab.isPinned}
              moveTab={moveTab}
              onPinToggle={togglePin}
              onClose={handleCloseTab}
            />
          ))}
        </div>
        {overflowTabs.length > 0 && (
          <TabDropdown
            overflowTabs={overflowTabs}
            onTabDrop={handleTabDrop}
            onPinToggle={togglePin}
            onClose={handleCloseTab}
          />
        )}
        
      </div>
      <div className="tab-controls">
        <input
          type="text"
          value={newTabTitle}
          onChange={(e) => setNewTabTitle(e.target.value)}
          placeholder="Enter tab title"
        />
        <select
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)}
        >
          <option value="">Select an icon</option>
          {Object.keys(iconComponents).map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>
        <button onClick={handleAddTab}>Add Tab</button>
      </div>
    </DndProvider>
  );
};

export const iconComponents = {
  FaApple,
  FaBeer,
  FaHome,
  FaStar,
};

const initialTabs = [
  { id: "initial-1", title: "Tab 1", icon: "FaApple", isPinned: false },
  { id: "initial-2", title: "Tab 2", icon: "FaBeer", isPinned: true },
];

export default TabsComponent;
