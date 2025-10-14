import React from "react";
import ShareButton from "./HeaderButtons/ShareButton";
import StarButton from "./HeaderButtons/StarButton";
import MoreOptionsButton from "./HeaderButtons/MoreOptionsButton";
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-3 border-b border-gray-800">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Cold Outreach - LinkedIn - Email
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">Edited 1h ago</span>
        <ShareButton />
        <StarButton />
        <MoreOptionsButton />
      </div>
    </header>
  );
};

export default Header;
