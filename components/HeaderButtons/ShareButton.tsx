import React from "react";
import { Share2Icon } from "../icons";

const ShareButton: React.FC = () => (
  <>
    <button className="px-3 py-1 text-sm rounded hover:bg-gray-800 transition-colors">
      Share
    </button>
    <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
      <Share2Icon className="w-4 h-4" />
    </button>
  </>
);

export default ShareButton;
