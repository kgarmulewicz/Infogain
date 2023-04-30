import React from "react";
import "./index.css";

const Spinner = () => (
  <div data-testid="spinner" className="spinner-ring">
    <div role='progressbar'></div>
    <div role='progressbar'></div>
    <div role='progressbar'></div>
    <div role='progressbar'></div>
  </div>
);

export default Spinner;
