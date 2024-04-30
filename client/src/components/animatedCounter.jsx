// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Total duration of the count effect
    const duration = 500; // duration of the count in milliseconds
    const end = parseInt(value, 10);

    if (start === end) return;

    // Find the increment per time step
    let incrementTime = (duration / end) * 20;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <h3 className="text-2xl font-semibold transition-all">
      {count.toLocaleString()}
    </h3>
  );
};

export default AnimatedCounter;
