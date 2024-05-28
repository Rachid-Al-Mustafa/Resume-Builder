import React from 'react';

const PersonalInfoForm = ({ formData, handleInputChange }) => {
  return (
    <>
      <main className="flex flex-col rounded-lg justify-start items-start py-6 px-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Let's Build A Resume!
        </h2>
        <p className="text-xl text-gray-600 text-start w-full md:w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
          odio venenatis, vulputate laoreet mauris at, gravida justo.
        </p>
      </main>
      <div className="flex flex-col gap-y-2 mb-6 mx-8 my-8 items-start">
        <label className="text-gray-700 text-sm font-bold mb-2">
          Full Name
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="full_name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          placeholder="E.g.: Johny Smith"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">Location</label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          value={formData.profile.location}
          onChange={handleInputChange}
          name="location"
          placeholder="E.g.: Lebanon"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="text"
          value={formData.phone}
          onChange={handleInputChange}
          name="phone"
          placeholder="E.g.: 71 927 178"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          placeholder="E.g.: example@gmail.com"
        />
        <label className="text-gray-700 text-sm font-bold mb-2">About</label>
        <textarea
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bio"
          value={formData.profile.bio}
          onChange={handleInputChange}
          name="bio"
          type="text"
          placeholder="E.g.: A brief description to show your employers"
        />
      </div>
    </>
  );
};

export default PersonalInfoForm;
