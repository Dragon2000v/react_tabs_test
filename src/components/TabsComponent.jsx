import React, { useState, useEffect } from "react";
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
  const [pinnedTabs, setPinnedTabs] = usePersistentState("pinnedTabs", []);
  const [unpinnedTabs, setUnpinnedTabs] = usePersistentState("unpinnedTabs", initialUnpinnedTabs);
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
        setUnpinnedTabs((prevTabs) => [...prevTabs, newTab]);
        setNewTabTitle("");
        setSelectedIcon("");
      } else {
        alert("Icon not found. Please check the icon name.");
      }
    }
  };

  const handleCloseTab = (id) => {
    setPinnedTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    setUnpinnedTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
  };

  const moveTab = (fromIndex, toIndex, isPinned) => {
    const targetTabs = isPinned ? pinnedTabs : unpinnedTabs;
    const setTabs = isPinned ? setPinnedTabs : setUnpinnedTabs;

    setTabs((prevTabs) => {
      const updatedTabs = [...prevTabs];
      const [movedTab] = updatedTabs.splice(fromIndex, 1);
      updatedTabs.splice(toIndex, 0, movedTab);
      return updatedTabs;
    });
  };

  const togglePin = (id) => {
    const tabIndex = unpinnedTabs.findIndex((tab) => tab.id === id);

    if (tabIndex !== -1) {
      // Перемістити з незакріплених до закріплених
      const [tab] = unpinnedTabs.splice(tabIndex, 1);
      tab.isPinned = true;
      setPinnedTabs((prevTabs) => [...prevTabs, tab]);
      setUnpinnedTabs([...unpinnedTabs]); // Оновити стан для незакріплених вкладок
    } else {
      // Перемістити з закріплених до незакріплених
      const pinnedIndex = pinnedTabs.findIndex((tab) => tab.id === id);
      const [tab] = pinnedTabs.splice(pinnedIndex, 1);
      tab.isPinned = false;
      setUnpinnedTabs((prevTabs) => [...prevTabs, tab]);
      setPinnedTabs([...pinnedTabs]); // Оновити стан для закріплених вкладок
    }
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
            isPinned: false, // Незакріплені вкладки
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
  }, [pinnedTabs, unpinnedTabs]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tabs-container">
        <div className="tabs-list">
          {pinnedTabs.map((tab, index) => (
            <Tab
              key={tab.id}
              tab={tab}
              index={index}
              isPinned={true}
              moveTab={(fromIndex, toIndex) => moveTab(fromIndex, toIndex, true)}
              onPinToggle={() => togglePin(tab.id)}
              onClose={() => handleCloseTab(tab.id)}
            />
          ))}
          {unpinnedTabs.map((tab, index) => (
            <Tab
              key={tab.id}
              tab={tab}
              index={index}
              isPinned={false}
              moveTab={(fromIndex, toIndex) => moveTab(fromIndex, toIndex, false)}
              onPinToggle={() => togglePin(tab.id)}
              onClose={() => handleCloseTab(tab.id)}
            />
          ))}
        </div>
        {overflowTabs.length > 0 && (
          <TabDropdown
            overflowTabs={overflowTabs}
            onPinToggle={(id) => togglePin(id)}
            onClose={(id) => handleCloseTab(id)}
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

const initialUnpinnedTabs = [
  { id: "initial-1", title: "Tab 1", icon: "FaApple", isPinned: false },
  { id: "initial-2", title: "Tab 2", icon: "FaBeer", isPinned: false },
];

export default TabsComponent;
