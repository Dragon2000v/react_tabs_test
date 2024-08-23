import React from "react";

const TabDropdown = ({ overflowTabs }) => {
  return (
    <div className="tab-dropdown">
      {overflowTabs.length > 0 && (
        <select>
          {overflowTabs.map((tab) => (
            <option key={tab.id}>{tab.title}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default TabDropdown;
