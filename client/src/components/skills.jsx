import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { languagesData } from '../utils/LanguagesData';

const Languages = ['English', 'Russian', 'Arabic', 'Hindi', 'Deutsch'];

const SkillLanguageProjectForm = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([
    { company: '', duration: '', description: '' },
  ]);

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const addLanguage = () => {
    if (selectedLanguage) {
      setLanguages([...languages, selectedLanguage]);
      setSelectedLanguage('');
    }
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const addSkill = (e) => {
    if (selectedSkill) {
      setSkills([...skills, selectedSkill]);
      setSelectedSkill('');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { company: '', duration: '', description: '' }]);
  };

  const removeProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <div className="flex flex-col container mx-auto items-start">
      <h1 className="text-2xl font-bold mt-8 mb-4">
        Add Skills, Languages, and Experience
      </h1>

      {/* Skills */}
      <div className="mb-6 flex flex-col items-start">
        <h2 className="text-lg font-bold mb-2">Skills</h2>
        <div>
          <input
            type="text"
            value={selectedSkill}
            onChange={handleSkillChange}
            onBlur={() => setSkills([...skills, ''])}
            placeholder="Add Skill"
            className="border rounded px-3 py-1 focus:outline-none focus:shadow-outline m-1"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-3 py-1 bg-blue-500 text-white rounded m-1"
          >
            Add Skill
          </button>
        </div>
        <div className="flex flex-wrap items-start">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1 m-1"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6 flex flex-col items-start">
        <h2 className="text-lg font-bold mb-2">Languages</h2>
        <div>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="border rounded px-3 py-1 focus:outline-none focus:shadow-outline m-1"
          >
            <option value="">Select Language</option>
            {Languages.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addLanguage}
            className="px-3 py-1 bg-blue-500 text-white rounded m-1"
          >
            Add Language
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center">
        {languages.map((language, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 m-1"
          >
            <span>{language}</span>
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="ml-2 text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Projects/Experience */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-bold mb-2">Projects/Experience</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 flex flex-row gap-2 items-start">
            <input
              type="text"
              value={project.company}
              onChange={(e) =>
                handleProjectChange(index, 'company', e.target.value)
              }
              placeholder="Company Name"
              className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              value={project.duration}
              onChange={(e) =>
                handleProjectChange(index, 'duration', e.target.value)
              }
              placeholder="Duration"
              className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline"
            />
            <textarea
              value={project.description}
              onChange={(e) =>
                handleProjectChange(index, 'description', e.target.value)
              }
              placeholder="Description (Optional)"
              className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline resize-none"
            />
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Project/Experience
        </button>
      </div>
    </div>
  );
};

export default SkillLanguageProjectForm;
