import React from "react";
import TabDropdownItem from "./TabDropdownItem";

const TabDropdown = ({ overflowTabs, onTabDrop, onPinToggle, onClose }) => {
  return (
    <div className="tab-dropdown">
      {overflowTabs.length > 0 && (
        <ul>
          {overflowTabs.map((tab, index) => (
            <TabDropdownItem
              key={tab.id}
              tab={tab}
              index={index}
              onTabDrop={onTabDrop}
              onPinToggle={onPinToggle}
              onClose={onClose}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TabDropdown;
