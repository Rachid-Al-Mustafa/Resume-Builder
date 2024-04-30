// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from '../components/card';
import CFA from '../components/callForAction';
import BWM from '../assets/BWM.png';
import BlueProfessional from '../assets/BlueProfessional.png';
import WhiteGrey from '../assets/WhiteGrey.png';
import BlackModern from '../assets/BlackModern.png';
import Input from '../components/input';
import StatusCard from '../components/statusCard';

function Home() {
  return (
    <>
      <Header />
      <div className="bg-hero bg-cover w-10/12 mx-auto mt-8 relative rounded-lg h-96">
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
      <div className="bg-gray-100 w-10/12 mx-auto my-4 rounded-lg h-auto">
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
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2 my-4">
          <Card
            title={'euhf'}
            description={'Black White Minimalist Resume'}
            image={BWM}
          />
          <Card
            title={'euhf'}
            description={'Minimalist White and Grey Professional Resume'}
            image={WhiteGrey}
          />
          <Card
            title={'euhf'}
            description={'Blue Professional Modern Resume'}
            image={BlueProfessional}
          />
          <Card
            title={'euhf'}
            description={'Black Modern Corporate Resume'}
            image={BlackModern}
          />
        </div>
      </div>
      <CFA />
      <div className="bg-gray-100 w-10/12 mx-auto my-4 rounded-lg h-auto p-4">
        <h2 className="text-3xl font-bold text-gray-800 my-4">
          Know More About Resume Builder
        </h2>
        <div className="flex flex-row justify-around p-8">
          <StatusCard number="1200" label="Subscribers" />
          <StatusCard number="4500" label="Downloads" />
          <StatusCard number="35" label="Templates Available" />
        </div>
      </div>
      <CFA />
      <div className="bg-gray-100 w-10/12 mx-auto my-4 rounded-lg h-auto">
        <div className="flex flex-col p-4 items-center">
          <div className="my-2">
            <h2 className="text-3xl font-bold text-gray-800">
              Subscrip Now And Stay Updated!
            </h2>
          </div>
          <div className="my-2 w-1/3 flex flex-row justify-between">
            <Input placeholder={'E.g.: emaple@gmail.com'} type={'email'} />
            <button
              type="submit"
              className="bg-blue-900 text-white py-1.5 px-2.5 rounded-md text-lg font-medium"
            >
              Join!
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
