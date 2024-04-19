// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const EducationForm = () => {
  const [educationLevel, setEducationLevel] = useState('');
  const [profession, setProfession] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [isStudent, setIsStudent] = useState(false);

  const educationOptions = [
    { id: 1, name: "Bachelor's Degree" },
    { id: 2, name: "Master's Degree" },
    { id: 3, name: 'PhD' },
    { id: 4, name: 'Other' },
  ];

  const professions = {
    "Bachelor's Degree": [
      'Engineering',
      'Business Administration',
      'Arts',
      'Science',
    ],
    "Master's Degree": ['MBA', 'MS Engineering', 'MFA', 'MS Science'],
    PhD: ['PhD Engineering', 'PhD Literature', 'PhD Science', 'PhD Psychology'],
  };

  useEffect(() => {
    if (educationLevel && educationLevel !== 'Other') {
      if (professions[educationLevel]) {
        setProfession(professions[educationLevel][0]);
      } else {
        setProfession('');
      }
    } else {
      setProfession('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationLevel]);

  return (
    <>
      <div className="flex flex-col gap-y-2 mb-6 mx-8 my-8 items-start">
        <label className="text-gray-700 text-sm font-bold mt-2">
          Level of Education
        </label>
        <select
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
        >
          <option value="">Select Education Level</option>
          {educationOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        {educationLevel !== 'Other' && educationLevel !== '' && (
          <>
            <label className="text-gray-700 text-sm font-bold mt-2">
              Profession
            </label>
            <select
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              {professions[educationLevel]?.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="isStudent"
                checked={isStudent}
                onChange={() => setIsStudent(!isStudent)}
                className="mr-2"
              />
              <label htmlFor="isStudent" className="text-gray-700">
                Still Learning
              </label>
            </div>
          </>
        )}

        {educationLevel === 'Other' && (
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your field"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        )}

        <label className="text-gray-700 text-sm font-bold mt-2">
          {isStudent ? 'Expected Graduation Year' : 'Years of Experience'}
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder={isStudent ? 'E.g.: 2024' : 'E.g.: 5'}
          value={isStudent ? graduationYear : yearsOfExperience}
          onChange={(e) =>
            isStudent
              ? setGraduationYear(e.target.value)
              : setYearsOfExperience(e.target.value)
          }
        />
      </div>
    </>
  );
};

export default EducationForm;
