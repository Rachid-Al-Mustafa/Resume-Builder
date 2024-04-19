// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '../components/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-between px-8 py-4 bg-white shadow-md mb-8 w-full">
      <h1 className="text-xl font-bold text-gray-800">Resume Builder</h1>
      <nav className="space-x-4">
        <Link to="/home" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        <Link to="/Templates" className="text-gray-600 hover:text-blue-500">
          Templates
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-blue-500">
          Profile
        </Link>
        <Link to="/">
          <Button text={'Log Out'} />
        </Link>
      </nav>
    </div>
  );
};

export default Header;
