// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const steps = [
  { name: 'Template', component: <Template /> },
  { name: 'Information', component: <Information /> },
  { name: 'Preview', component: <Preview /> },
];

function Templates() {
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
        <Header />
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`w-${
              (currentStep + 1) * (100 / steps.length)
            }% bg-blue-500 rounded-full h-2`}
          ></div>
        </div>
        <Footer />
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
    <div className="container mx-auto px-4 py-8">
      <Progress />
      <FormContent />
      <ButtonGroup />
    </div>
  );
}

function Template() {
  // ... Template selection logic
}

function Information() {
  // ... Information form fields and logic
}

function Preview() {
  // ... Preview logic
}

export default Templates;
