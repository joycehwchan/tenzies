import React from "react";

const Die = (props) => {
  return (
    <div className="die">
      <p className="die-number">{props.value}</p>
    </div>
  );
};

export default Die;
