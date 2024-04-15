// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600">Page not found</p>
      <button
        className="mt-4 bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
        onClick={() => navigate('/home')}
      >
        Back home
      </button>
    </div>
  );
}

export default NotFound;

// Optional animation styles
// const animationStyles = `
//   @keyframes float {
//     0%, 100% {
//       transform: translateY(0px);
//     }
//     50% {
//       transform: translateY(-10px);
//     }
//   }

//   .animation-float {
//     animation: float 3s infinite ease-in-out;
//   }
// `;

// // Add these styles to your main CSS file (e.g., tailwind.css)
// export default animationStyles;
