// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import EducationForm from '../components/educationForm';
import PersonalInfoForm from '../components/personalInfoForm';
import SkillsForm from '../components/skills';

const steps = [
  { name: 'Personal Info', component: <PersonalInfoForm /> },
  { name: 'Education', component: <EducationForm /> },
  { name: 'Contact', component: <SkillsForm /> },
];

function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

const Progress = () => {
  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`w-${
            currentStep * (100 / (steps.length - 1))
          }% bg-blue-500 rounded-full h-2`}
        ></div>
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
