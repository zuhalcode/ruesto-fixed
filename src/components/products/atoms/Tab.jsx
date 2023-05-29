import React, { useRef, useState } from "react";

const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const hrRef = useRef(null);

  const handleOnMouseEnter = (e, width = 250, left = 0) => {
    hrRef.current.style.width = `${width}px`;
    hrRef.current.style.left = `${left}px`;
  };

  const handleOnMouseLeave = (e) => {
    hrRef.current.style.width = `250px`;
    hrRef.current.style.left = "0";
  };

  const handleTabClick = (index) => setActiveTab(index);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-around border-b border-black px-3 py-2 text-xl font-semibold uppercase tracking-wide text-accent">
        {React.Children.map(children, (child, index) => (
          <p
            className="cursor-pointer px-3"
            onClick={() => handleTabClick(index)}
            onMouseEnter={(e) =>
              handleOnMouseEnter(e, child.props.width, child.props.left)
            }
            onMouseLeave={handleOnMouseLeave}
          >
            {child.props.title}
          </p>
        ))}
      </div>
      <hr
        ref={hrRef}
        className="relative border-accent duration-500"
        style={{ width: "250px" }}
      />
      {children[activeTab]}
    </div>
  );
};

const TabPanel = ({ children }) => {
  return <div>{children}</div>;
};

Tab.Panel = TabPanel;

export default Tab;
