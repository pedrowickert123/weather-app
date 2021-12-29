import React from "react";
import { format } from "date-fns";
import "./style.scss";

export function City({ name }) {
  const today = format(new Date(), "dd 'de' eeee 'de' yyyy");
  return (
    <div className="city-component">
      <span className="name">{name}</span>
      <span className="date">{today}</span>
    </div>
  );
}
