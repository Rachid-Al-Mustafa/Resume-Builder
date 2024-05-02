import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { languagesData } from '../utils/LanguagesData';

const SkillLanguageProjectForm = ({ nextStep }) => {
  // Form states
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [projects, setProjects] = useState([
    { company: '', duration: '', description: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State variable for submission status

  const handleSkillChange = (e) => setSelectedSkill(e.target.value);
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);

  const addSkill = () => {
    if (selectedSkill) {
      setSkills([...skills, selectedSkill]);
      setSelectedSkill('');
    }
  };

  const addLanguage = () => {
    if (selectedLanguage) {
      setLanguages([...languages, selectedLanguage]);
      setSelectedLanguage('');
    }
  };

  const addProject = () => {
    setProjects([...projects, { company: '', duration: '', description: '' }]);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const removeProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Avoid multiple submissions

    setIsSubmitting(true); // Set submitting status to true

    const formData = {
      skills,
      languages,
      projects,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/create-skills',
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data submitted successfully!',
        });

        if (nextStep) nextStep(); // If there's a next step, call it
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission failed',
        text: error.response?.data?.message || 'An error occurred.',
      });
    } finally {
      setIsSubmitting(false); // Reset submission status
    }
  };

  return (
    <div className="flex flex-col container mx-auto items-start">
      <h1 className="text-2xl font-bold mt-8 mb-4">
        Skills, Languages, and Projects
      </h1>

      {/* Skills */}
      <div className="mb-6 flex flex-col items-start">
        <h2>Skills</h2>
        <input
          type="text"
          value={selectedSkill}
          onChange={handleSkillChange}
          placeholder="Enter skill"
        />
        <button onClick={addSkill}>Add Skill</button>
        {skills.map((skill, index) => (
          <div key={index}>
            {skill}
            <button onClick={() => removeSkill(index)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="mb-6 flex flex-col items-start">
        <h2>Languages</h2>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="">Select Language</option>
          {languagesData.map((language, index) => (
            <option key={index} value={language.label}>
              {language.label}
            </option>
          ))}
        </select>
        <button onClick={addLanguage}>Add Language</button>
        {languages.map((language, index) => (
          <div key={index}>
            {language}
            <button onClick={() => removeLanguage(index)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6 flex flex-col items-start">
        <h2>Projects</h2>
        {projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              value={project.company}
              placeholder="Company"
              onChange={(e) =>
                handleProjectChange(index, 'company', e.target.value)
              }
            />
            <input
              type="text"
              value={project.duration}
              placeholder="Duration"
              onChange={(e) =>
                handleProjectChange(index, 'duration', e.target.value)
              }
            />
            <textarea
              value={project.description}
              placeholder="Description"
              onChange={(e) =>
                handleProjectChange(index, 'description', e.target.value)
              }
            />
            <button onClick={() => removeProject(index)}>Remove Project</button>
          </div>
        ))}
        <button onClick={addProject}>Add Project</button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting} // Disable button during submission
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default SkillLanguageProjectForm;
