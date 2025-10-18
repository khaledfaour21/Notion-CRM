import React from "react";
import Select from "react-select";

const groupedStatusOptions = [
  {
    label: "To-do",
    options: [
      { value: "todo", label: "To Do", color: "#999999" },
    ],
  },
  {
    label: "In progress",
    options: [
      { value: "inprogress", label: "In Progress", color: "#999999" },
    ],
  },
  {
    label: "Complete",
    options: [
      { value: "done", label: "Done", color: "#999999" },
    ],
  },
];

const customStyle = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? state.data.color : undefined,
    color: state.isSelected ? "white" : "inherit",
  }),
  singleValue: (styles, state) => ({
    ...styles,
    color: state.data.color,
  }),
};

const StatusSelect = ({ value, onChange }) => (
  <Select
    options={groupedStatusOptions}
    value={value}
    onChange={onChange}
    styles={customStyle}
  />
);

export default StatusSelect;
