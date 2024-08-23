import React from "react";

const Tab = React.forwardRef(({ tab, isPinned, ...props }, ref) => {
  return (
    <div className={`tab ${isPinned ? "pinned" : ""}`} ref={ref} {...props}>
      {tab.title}
    </div>
  );
});

export default Tab;
