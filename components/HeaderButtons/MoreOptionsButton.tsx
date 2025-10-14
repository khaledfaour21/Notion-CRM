import React from 'react';
import { MoreHorizontalIcon } from '../icons';

const MoreOptionsButton: React.FC = () => (
  <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
    <MoreHorizontalIcon className="w-4 h-4" />
  </button>
);

export default MoreOptionsButton;
