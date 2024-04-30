/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden w-56 mx-auto mb-4 cursor-pointer">
      <div className="bg-white">
        <div className="relative">
          <img
            className="w-full h-auto object-cover mb-1"
            src={image}
            alt={title}
          />
        </div>
      </div>
      <p className="text-gray-700 mb-4 pb-2 max-w-52">{description}</p>
    </div>
  );
};

export default Card;
