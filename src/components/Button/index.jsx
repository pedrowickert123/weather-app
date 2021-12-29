import React from "react";
import "./style.scss";

export function Button({ onClick }) {
  return (
    <button className="button" onClick={onClick}>
      Atualizar
    </button>
  );
}
