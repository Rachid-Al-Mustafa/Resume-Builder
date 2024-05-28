import React, { useState, useContext } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import EducationForm from '../components/educationForm';
import PersonalInfoForm from '../components/personalInfoForm';
import SkillsForm from '../components/skills';
import { handleChange } from '../utils/handleChange';
import { postRequest } from '../utils/requests';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function GetStarted() {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [updatedUserData, setUpdatedUserData] = useState(userData);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    await setUpdatedUserData((prev) => {
      if (name === 'profile.university') {
        return {
          ...prev,
          profile: {
            ...prev.profile,
            university: [...prev.profile.university, value],
          },
        };
      }

      if (name.startsWith('profile.')) {
        const [_, profileField] = name.split('.');
        return {
          ...prev,
          profile: {
            ...prev.profile,
            [profileField]: value,
          },
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(updatedUserData);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const steps = [
    {
      name: 'Personal Info',
      component: (
        <PersonalInfoForm
          formData={updatedUserData}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      name: 'Education',
      component: (
        <EducationForm
          handleInputChange={handleInputChange}
          unis={userData.profile.university}
        />
      ),
    },
    {
      name: 'Contact',
      component: (
        <SkillsForm
          handleInputChange={handleInputChange}
          skills={userData.profile.skills}
          languages={userData.profile.languages}
        />
      ),
    },
  ];

  const Progress = () => {
    const completionPercentage = (currentStep / (steps.length - 1)) * 100;

    return (
      <>
        <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </>
    );
  };

  const FormContent = () => {
    return steps[currentStep].component;
  };

  const ButtonGroup = () => {
    return (
      <div className="flex justify-between items-center pt-4">
        {currentStep > 0 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={nextStep}
            id="next"
          >
            Next
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            Submit
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Progress />
        <FormContent />
        <ButtonGroup />
      </div>
      <Footer />
    </>
  );
}

export default GetStarted;
