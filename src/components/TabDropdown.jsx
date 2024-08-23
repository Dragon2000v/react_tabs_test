import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { ExpandMore, Close, PushPin } from "@mui/icons-material";

const TabDropdown = ({ overflowTabs, unpinnedTabs, onPinToggle, onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTabId, setSelectedTabId] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectChange = (event) => {
    setSelectedTabId(event.target.value);
  };

  const handlePinToggle = () => {
    if (selectedTabId) {
      onPinToggle(selectedTabId);
      setSelectedTabId("");
      handleCloseMenu();
    }
  };

  const handleClose = () => {
    if (selectedTabId) {
      onClose(selectedTabId);
      setSelectedTabId("");
      handleCloseMenu();
    }
  };

  const open = Boolean(anchorEl);
  const menuId = "simple-menu";

  return (
    <div>
      <IconButton
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <ExpandMore />
      </IconButton>
      <Menu
        className="tab-dropdown"
        id={menuId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "40ch",
            marginLeft: 12,
          },
        }}
      >
        {overflowTabs
          .filter((tab) =>
            unpinnedTabs.some((unpinnedTab) => unpinnedTab.id === tab.id)
          )
          .map((tab) => (
            <MenuItem
              key={tab.id}
              selected={tab.id === selectedTabId}
              onClick={() => setSelectedTabId(tab.id)}
            >
              {tab.title}
            </MenuItem>
          ))}
      </Menu>
      <div style={{ marginTop: 16 }}>
        <IconButton
          color="primary"
          onClick={handlePinToggle}
          disabled={!selectedTabId}
          aria-label="Pin/Unpin"
        >
          <PushPin />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={handleClose}
          disabled={!selectedTabId}
          aria-label="Close"
        >
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default TabDropdown;
