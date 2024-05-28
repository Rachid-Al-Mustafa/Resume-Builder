// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Input from './input';
import { handleChange } from '../utils/handleChange';
import { postRequest } from '../utils/requests';

const EducationForm = ({ handleInputChange }) => {
  const educationOptions = [
    { id: 1, name: "Bachelor's Degree" },
    { id: 2, name: "Master's Degree" },
    { id: 3, name: 'PhD' },
  ];

  const [isStudent, setIsStudent] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [Data, setData] = useState({
    level: '',
    highLevel: true,
    graduated: !isStudent,
    university: '',
    major: '',
    startDate: '',
    endDate: '',
    graduationDate: '',
  });
  const [educationLevel, setEducationLevel] = useState('');

  const handleSaveData = async () => {
    try {
      const response = await postRequest('/education/createEducation', Data);
      handleInputChange({
        target: {
          name: 'profile.university',
          value: response.data._id,
        },
      });
    } catch (error) {
      console.error('Error saving education data:', error);
    }
  };

   const handleInputsChange = (e) => {
     const { name, value } = e.target;
     setData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };


    const handleCheckboxChange = (setter) => (e) => {
      setter(e.target.checked);
    };


  return (
    <>
      <div className="flex flex-col gap-y-2 mb-6 mx-8 my-8 items-start">
        <label className="text-gray-700 text-sm font-bold mt-2">
          Level of Education
        </label>
        <select
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={educationLevel}
          name="level"
          onChange={handleInputsChange}
        >
          <option value="">Select Education Level</option>
          {educationOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <label className="text-gray-700 text-sm font-bold mt-2">
          University
        </label>
        <Input
          label="University"
          placeholder="Your University"
          name="university"
          value={Data?.university}
          handleChange={handleInputsChange}
        />

        <label className="text-gray-700 text-sm font-bold mt-2">Major</label>
        <Input
          label="Major"
          placeholder="Your Major"
          name="major"
          value={Data?.major}
          handleChange={handleInputsChange}
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="isStudent"
            name="graduated"
            checked={isStudent}
            onChange={(e) => {
              setIsStudent(!isStudent);
              setData((prevData) => ({
                ...prevData,
                graduated: !e.target.checked,
              }));
            }}
            className="mr-2"
          />
          <label htmlFor="isStudent" className="text-gray-700">
            Still Learning
          </label>
        </div>

        <label className="text-gray-700 text-sm font-bold mt-2">
          {isStudent ? 'Expected Graduation Year' : 'Graduation Year'}
        </label>
        {isStudent ? (
          <Input
            label="Expected Graduation Date"
            type="date"
            name="graduationDate"
            value={Data?.graduationDate}
            handleChange={handleInputsChange}
          />
        ) : (
          <>
            <label className="text-gray-700 text-sm font-bold mt-2">From</label>
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={Data?.startDate}
              handleChange={handleInputsChange}
            />
            <label className="text-gray-700 text-sm font-bold mt-2">To</label>
            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={Data?.endDate}
              handleChange={handleInputsChange}
            />
          </>
        )}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="isDone"
            checked={completed}
            onChange={(e) => {
              setCompleted(e.target.checked);
            }}
            className="mr-2"
          />
          <label htmlFor="isDone" className="text-gray-700">
            I have Completed the above education.
          </label>
        </div>
      </div>
    </>
  );
};

export default EducationForm;
