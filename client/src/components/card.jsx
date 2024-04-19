/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto mb-4">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="absolute bottom-0 w-full px-4 py-2 bg-gradient-to-b from-gray-200 to-transparent">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-700 mb-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
