import React from "react";
import {
  ChevronsLeftRightIcon,
  Maximize2Icon,
  StarIcon,
  MoreHorizontalIcon,
  Share2Icon,
} from "../icons";

interface DrawerHeaderProps {
  onClose: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ onClose }) => (
  <div className="flex items-center justify-between p-2 border-b border-gray-800 text-gray-400 sticky top-0 bg-[#1E1E1E] z-10">
    <div className="flex items-center space-x-2">
      <button onClick={onClose} className="p-1 rounded hover:bg-gray-800">
        <ChevronsLeftRightIcon className="w-4 h-4" />
      </button>
      <button className="p-1 rounded hover:bg-gray-800">
        <Maximize2Icon className="w-4 h-4" />
      </button>
    </div>
    <div className="flex items-center space-x-1">
      <button className="px-2 py-1 text-sm rounded hover:bg-gray-800">
        Share
      </button>
      <button className="p-1 rounded hover:bg-gray-800">
        <Share2Icon className="w-4 h-4" />
      </button>
      <button className="p-1 rounded hover:bg-gray-800">
        <StarIcon className="w-4 h-4" />
      </button>
      <button className="p-1 rounded hover:bg-gray-800">
        <MoreHorizontalIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default DrawerHeader;
