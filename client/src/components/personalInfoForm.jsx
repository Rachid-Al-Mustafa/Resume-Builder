// eslint-disable-next-line no-unused-vars
import React from 'react';

const PersonalInfoForm = () => {
  return (
    <>
      <main className="flex flex-col rounded-lg justify-start items-start py-6 px-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Lets Build A Resume!
        </h2>
        <p className="text-xl text-gray-600 text-start w-full md:w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
          odio venenatis, vulputate laoreet mauris at, gravida justo.
        </p>
      </main>
      <div className="flex flex-col gap-y-2 mb-6 mx-8 my-8 items-start">
        <label className="text-gray-700 text-sm font-bold mb-2">
          First name
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: Johny"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">
          Last name
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: Smith"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: 71 927 178"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: emaple@gmail.com"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">Bio</label>
        <textarea
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: A brief description, that you like to show your employers"
        />
      </div>
    </>
  );
};

export default PersonalInfoForm;
