// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const steps = [
  { name: 'Personal Info', component: <PersonalInfo /> },
  { name: 'Education', component: <Education /> },
  { name: 'Contact', component: <Contact /> },
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
              (currentStep + 1) * (100 / steps.length)
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

function PersonalInfo() {
  return (
    <>
      <div className="flex flex-col gap-y-2 mb-6 mx-8">
        <label className="justify-start text-gray-700 text-sm font-bold mb-2">
          First name
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: Johny"
        />
        <label className="justify-start text-gray-700 text-sm font-bold mb-2">
          Last name
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: Smith"
        />
        <label className="justify-start text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: 71 927 178"
        />
        <label className="justify-start text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="E.g.: emaple@gmail.com"
        />
      </div>
    </>
  );
}

function Education() {
  // ... Education form fields and logic
}

function Contact() {
  // ... Contact form fields and logic
}

export default GetStarted;
