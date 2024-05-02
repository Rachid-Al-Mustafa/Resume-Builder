// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PersonalInfoForm = ({ nextStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State variable to track submission status

  const [parentElementShown, setParentElementShown] = useState(false);
  useEffect(() => {
    const element = document.getElementById('next');
    if (element) {
      element.remove();
      setParentElementShown(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    bio: '',
    location: '',
    phone: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set submission status to true
    try {
      const response = await axios.post(
        'http://localhost:8000/api/create',
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your form has been submitted successfully!',
        });
        nextStep();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    } finally {
      setIsSubmitting(false); // Reset submission status
    }
  };

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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2 mb-6 mx-8 my-8 items-start">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            name="full_name"
            placeholder="E.g.: Johny Smith"
          />
          <label className="text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
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
            onChange={handleChange}
            name="phone"
            placeholder="E.g.: 71 927 178"
          />
          <label className="text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="E.g.: emaple@gmail.com"
          />
          <label className="text-gray-700 text-sm font-bold mb-2">Bio</label>
          <textarea
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            name="bio"
            type="text"
            placeholder="E.g.: A brief description, that you like to show your employers"
          />
          {parentElementShown && (
            <button
              onClick={(e) => {
                handleSubmit();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default PersonalInfoForm;
