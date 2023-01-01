import React from "react";

const Die = (props) => {
  const styles = {
    backgroundColor: props.selected ? "#f9dc5c" : "white",
  };

  return (
    <div className="die" style={styles} onClick={props.selectDice}>
      <p className="die-number">{props.value}</p>
    </div>
  );
};

export default Die;
