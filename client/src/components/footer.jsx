// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  FaPhoneAlt,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaCopyright,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center pt-4 mt-8">
      <div className="flex flex-row">
        <div className=" flex flex-col items-start p-4 w-1/3">
          <h2 className="text-3xl font-bold text-black mb-4">Resume Builder</h2>
          <p className="text-lg text-black text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam. Aenean eu leo quam. Aenean eu leo quam.
          </p>
        </div>
        <div className="flex flex-col items-start p-4 w-1/3">
          <h2 className="text-lg font-bold text-black mb-2">Lorem ipsum</h2>
          <p className="text-sm text-black text-start mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam.
          </p>
          <h2 className="text-lg font-bold text-black mb-2">Lorem ipsum</h2>
          <p className="text-sm text-black text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam.
          </p>
        </div>
        <div className="flex flex-col items-end p-4 w-1/6"></div>
        <div className="flex flex-col items-end p-4 w-1/6">
          <div className="flex flex-row w-full items-center justify-between mb-4">
            <p className="text-md text-bold ">+961 71 927 178</p>
            <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
              <FaPhoneAlt />
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between mb-4">
            <p className="text-md text-bold ">Resume Builder</p>
            <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
              <FaInstagram />
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between mb-4">
            <p className="text-md text-bold ">Resume Builder</p>
            <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
              <FaTiktok />
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between mb-2">
            <p className="text-md text-bold ">Resume Builder</p>
            <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full mt-4">
        <p className="text-sm text-gray-600 self-center w-auto mr-2 pb-2">
          This Website Is Owned And Managed By Resume Builder
        </p>
        <div className=' opacity-35'>

          <FaCopyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
