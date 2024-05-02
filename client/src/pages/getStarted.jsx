// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import EducationForm from '../components/educationForm';
import PersonalInfoForm from '../components/personalInfoForm';
import SkillsForm from '../components/skills';

function GetStarted() {
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const steps = [
    {
      name: 'Personal Info',
      component: <PersonalInfoForm nextStep={nextStep} />,
    },
    { name: 'Education', component: <EducationForm nextStep={nextStep} /> },
    { name: 'Contact', component: <SkillsForm /> },
  ];

  const [currentStep, setCurrentStep] = useState(0); 

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isSubmitting) return;
  //   setIsSubmitting(true);
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8000/api/create',
  //       formData
  //     );
  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success!',
  //         text: 'Your form has been submitted successfully!',
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Something went wrong!',
  //     });
  //     console.error('Error:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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
