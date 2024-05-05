// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { postRequest } from '../utils/requests';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await postRequest('/logout', { userId: user._id });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex justify-between px-8 py-4 bg-white shadow-md w-full">
      <h1 className="text-xl font-bold text-gray-800">Resume Builder</h1>
      <div className="flex justify-between">
        <nav className="space-x-4 px-4">
          <Link to="/home" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link to="/Templates" className="text-gray-600 hover:text-blue-500">
            Templates
          </Link>
          <Link
            to={`/profile`}
            className="text-gray-600 hover:text-blue-500"
          >
            Profile
          </Link>
        </nav>
        <div onClick={handleLogout}>
          <Button text={'Log Out'} />
        </div>
      </div>
    </div>
  );
};

export default Header;
