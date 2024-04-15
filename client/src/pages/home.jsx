// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '../components/button';

function Home() {
  return (
    <>
      <div className="flex justify-between px-8 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Resume Builder</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Contact
          </a>
        </nav>
      </div>
      <div className="min-h-screen bg-gray-100">
        <main className="flex flex-col justify-center items-center py-16 px-8 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to Our Website
          </h2>
          <p className="text-xl text-gray-600 text-center w-full md:w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam. Pellentesque lorem quam, feugiat non commodo ut,
            pretium a libero.
          </p>
          <Button text={'Get Started'} />
        </main>
        <footer className="bg-gray-200 text-center py-4">
          <p className="text-sm text-gray-600">
            Copyright &copy; 2024 Your Website Name
          </p>
        </footer>
      </div>
    </>
  );
}

export default Home;
