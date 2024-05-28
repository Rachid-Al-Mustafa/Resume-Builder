import React, { useState, useEffect, useContext, useCallback } from 'react';
import Skill from '../pages/Profile/components/Skill/index';
import { postRequest } from '../utils/requests';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SkillLanguageProjectForm = ({ handleInputChange, skills, languages }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;

  const Levels = ['Beginner', 'Basic', 'Good', 'Advance', 'Expert'];
  const [skillInput, setSkillInput] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [skillID, setSkilID] = useState([...skills]);
  const [skillsData, setSkillsData] = useState([]);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);
  const handleLLevelChange = (e) => setSelectedLLevel(e.target.value);

  const [languageInput, setLanguageInput] = useState('');
  const [selectedLLevel, setSelectedLLevel] = useState('');
  const [languageID, setLanguageID] = useState([...languages]);
  const [languageData, setLanguageData] = useState([]);
  const [projects, setProjects] = useState([
    { company: '', duration: '', description: '' },
  ]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest('/skill/getSkills', skillID);
        if (response.status === 200) {
          await setSkillsData(response.data.skills);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [skillInput, skillID]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await postRequest('/skill/getSkills', languageID);

        if (response.status === 200) {
          await setLanguageData(response.data.skills);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, [languageID, languageInput]);

  const handleAddLanguage = useCallback(
    async (e) => {
      e.preventDefault();

      if (languageInput.trim() !== '' && selectedLLevel.trim() !== '') {
        const newLanguage = {
          name: languageInput.trim(),
          level: selectedLLevel.trim(),
        };
        const response = await postRequest('/skill/create', newLanguage);
        if (response.status === 200) {
          const newLanguageID = [...languageID, response.data.skill._id];
          setLanguageID(newLanguageID);
          setLanguageInput('');
          setSelectedLLevel('Beginner');

          handleInputChange({
            target: {
              name: 'profile.languages',
              value: newLanguageID,
            },
          });
        }
      }
    },
    [languageInput, selectedLLevel, languageID, handleInputChange]
  );

  const handleRemoveLanguage = useCallback(
    async (e, Index) => {
      e.preventDefault();
      setLanguageID((prev) => {
        if (Index >= 0 && Index < prev.length) {
          const newLanguages = prev.filter((_, i) => i !== Index);
          handleInputChange({
            target: {
              name: 'profile.languages',
              value: newLanguages,
            },
          });
          return newLanguages;
        }
        return prev;
      });
    },
    [handleInputChange]
  );

  const handleAddSkill = useCallback(
    async (e) => {
      e.preventDefault();

      if (skillInput.trim() !== '' && selectedLevel.trim() !== '') {
        const newSkill = {
          name: skillInput.trim(),
          level: selectedLevel.trim(),
        };
        const response = await postRequest('/skill/create', newSkill);
        if (response.status === 200) {
          const newSkillID = [...skillID, response.data.skill._id];
          setSkilID(newSkillID);
          setSkillInput('');
          setSelectedLevel('Beginner');

          handleInputChange({
            target: {
              name: 'profile.skills',
              value: newSkillID,
            },
          });
        }
      }
    },
    [skillInput, selectedLevel, skillID, handleInputChange]
  );

  const handleRemoveSkill = useCallback(
    async (e, Index) => {
      e.preventDefault();
      setSkilID((prev) => {
        if (Index >= 0 && Index < prev.length) {
          const newSkills = prev.filter((_, i) => i !== Index);
          handleInputChange({
            target: {
              name: 'profile.skills',
              value: newSkills,
            },
          });
          return newSkills;
        }
        return prev;
      });
    },
    [handleInputChange]
  );

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
        <div className="flex flex-col gap-3 items-start">
          <div className="flex flex-row gap-3">
            <div className="flex gap-2 p-2 rounded-md border-2">
              <input
                className="placeholder:text-gray-500 font-medium flex-1 outline-none bg-transparent"
                type="text"
                placeholder="Add skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <select value={selectedLevel} onChange={handleLevelChange}>
                {Levels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddSkill}
              className="bg-blue-400 text-white p-2.5 rounded-md font-medium"
            >
              Add Skill
            </button>
          </div>
          {skillsData?.length > 0 && (
            <div className="flex items-center flex-wrap gap-4 py-3.5 max-h-[400px] overflow-y-hidden overflow-x-hidden scrollbar-hide">
              {skillsData.map((skill, index) => (
                <div
                  className={
                    skill.level === 'Beginner'
                      ? 'bg-red-400'
                      : skill.level === 'Basic'
                      ? 'bg-orange-400'
                      : skill.level === 'Good'
                      ? 'bg-gray-400'
                      : skill.level === 'Advance'
                      ? 'bg-green-400'
                      : 'bg-blue-400'
                  }
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveSkill(e, index);
                  }}
                >
                  <Skill skill={skill.name} remove={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6 flex flex-col items-start">
        <h2 className="text-lg font-bold mb-2">Languages</h2>
        <div className="flex flex-col gap-3 items-start">
          <div className="flex flex-row gap-3">
            <div className="flex gap-2 p-2 rounded-md border-2">
              <input
                className="placeholder:text-gray-500 font-medium flex-1 outline-none bg-transparent"
                type="text"
                placeholder="Add Language"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
              />
              <select value={selectedLLevel} onChange={handleLLevelChange}>
                {Levels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddLanguage}
              className="bg-blue-400 text-white p-2.5 rounded-md mt-4 font-medium"
            >
              Add Language
            </button>
          </div>
          {languageData?.length > 0 && (
            <div className="flex items-center flex-wrap gap-4 py-3.5 max-h-[400px] overflow-y-hidden overflow-x-hidden scrollbar-hide">
              {languageData.map((lan, index) => (
                <div
                  className={
                    lan.level === 'Beginner'
                      ? 'bg-red-400'
                      : lan.level === 'Basic'
                      ? 'bg-orange-400'
                      : lan.level === 'Good'
                      ? 'bg-gray-400'
                      : lan.level === 'Advance'
                      ? 'bg-green-400'
                      : 'bg-blue-400'
                  }
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveLanguage(e, index);
                  }}
                >
                  <Skill skill={lan.name} remove={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects/Experience */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-bold mb-2">Experience</h2>
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
              Remove Experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default SkillLanguageProjectForm;
