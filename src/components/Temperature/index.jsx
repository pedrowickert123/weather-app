import React from "react";
import "./style.scss";

export function Temperature({ temperature }) {
  return (
    <div className="temperature-component">
      <div className="temperature">{temperature}</div>
      <div className="symbol">°C</div>
    </div>
  );
}
