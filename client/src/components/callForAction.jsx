// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from './button';
import { Link } from 'react-router-dom';

const CFA = () => {
  return (
    <div className="w-10/12 mx-auto rounded-lg my-4 bg-gradient-to-r from-sky-400 to-violet-400 h-[50] flex justify-between p-4">
      <div className="flex flex-col items-start">
        <h2 className="text-white font-bold text-3xl mb-2">
          What are you waiting for?
        </h2>
        <p className="text-white font-bold text-sm">
          create your own resume now, and join the hiring marathon.
        </p>
      </div>
      <div className="flex flex-col-reverse">
        <Link to="/GetStarted">
          <Button text="Create Now!" className="relative bottom-0 right-0" />
        </Link>
      </div>
    </div>
  );
};

export default CFA;
