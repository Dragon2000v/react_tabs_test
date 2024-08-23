import React, { useState } from "react";

const TabDropdown = ({ overflowTabs, onPinToggle, onClose }) => {
  const [selectedTabId, setSelectedTabId] = useState("");

  const handleSelectChange = (event) => {
    setSelectedTabId(event.target.value);
  };

  const handlePinToggle = () => {
    if (selectedTabId) {
      onPinToggle(selectedTabId);
      setSelectedTabId(""); // Скидаємо вибір після виконання дії
    }
  };

  const handleClose = () => {
    if (selectedTabId) {
      onClose(selectedTabId);
      setSelectedTabId(""); // Скидаємо вибір після виконання дії
    }
  };

  return (
    <div className="tab-dropdown">
      <select value={selectedTabId} onChange={handleSelectChange}>
        <option value="">Select a tab</option>
        {overflowTabs.map((tab) => (
          <option key={tab.id} value={tab.id}>
            {tab.title}
          </option>
        ))}
      </select>
      <button onClick={handlePinToggle} disabled={!selectedTabId}>
        Pin/Unpin
      </button>
      <button onClick={handleClose} disabled={!selectedTabId}>
        Close
      </button>
    </div>
  );
};

export default TabDropdown;
