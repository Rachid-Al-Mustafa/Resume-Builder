// eslint-disable-next-line no-unused-vars
import React from 'react';
import AnimatedCounter from './animatedCounter'; // Make sure to import AnimatedCounter

const StatusCard = ({ number, label }) => {
  return (
    <div className="text-center p-4">
      <AnimatedCounter value={number} />
      <p className="text-lg text-gray-600">{label}</p>
    </div>
  );
};

export default StatusCard;
