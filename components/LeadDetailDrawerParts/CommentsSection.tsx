import React from "react";

const CommentsSection: React.FC = () => (
  <div>
    <p className="text-sm text-gray-400 mb-2">Comments</p>
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        F
      </div>
      <input
        type="text"
        placeholder="Add a comment..."
        className="bg-transparent w-full focus:outline-none text-sm"
      />
    </div>
  </div>
);

export default CommentsSection;
