import React from "react";
import { StarIcon } from "../icons";

const StarButton: React.FC = () => (
  <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
    <StarIcon className="w-4 h-4" />
  </button>
);

export default StarButton;
