import React from "react";

export default function Die({ value, isheld, holdDice }) {
  const styles = {
    backgroundColor: isheld ? "green" : "white",
    color: isheld ? "white" : "black",
  };
  return (
    <div className="die-face" style={styles} onClick={holdDice}>
      <h2>{value}</h2>
    </div>
  );
}
