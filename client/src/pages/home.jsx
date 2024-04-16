// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Home() {
  return (
    <>
      <Header />
      <div className="bg-hero bg-cover w-10/12 mx-auto relative rounded-lg h-96">
        <main className="flex flex-col absolute bottom-0 rounded-lg justify-start items-start py-6 px-8 space-y-8">
          <h2 className="text-3xl font-bold text-white">
            Welcome to Our Website
          </h2>
          <p className="text-xl text-white text-start w-full md:w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam.
          </p>
          <Link to="/GetStarted">
            <Button text={'Create Your CV'} />
          </Link>
        </main>
      </div>
      <div className="bg-gray-100 w-10/12 mx-auto my-4 rounded-lg h-96">
        <main className="flex flex-col rounded-lg justify-start items-start py-6 px-8 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Use Resume Builder?
          </h2>
          <p className="text-xl text-gray-600 text-start w-full md:w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio venenatis, vulputate laoreet mauris at, gravida justo. Aenean
            eu leo quam.
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
