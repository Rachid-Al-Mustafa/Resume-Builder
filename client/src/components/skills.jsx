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

  const [projects, setProjects] = useState({
    companyName: '',
    position: '',
    tasks: '',
    startDate: '',
    endDate: '',
    stillWorking: false,
  });
  const [experienceData, setExperienceData] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [completed, setCompleted] = useState(false);

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
          return newSkills;
        }
        return prev;
      });
    },
    [handleInputChange]
  );

  const handleProjectChange = async (field, value) => {
    const updatedProjects = { ...projects, [field]: value };
    console.log(updatedProjects);
    await setProjects(updatedProjects);
  };

  useEffect(() => {
    setIsWorking(projects.stillWorking);
  }, [projects.stillWorking]);

const handleConfirmation = async (e) => {
  e.preventDefault();
  if (e.target.checked) {
    const response = await postRequest('/experience/experience', projects);
    if (response.status === 200) {
      console.log(response.data);
      const newExperienceID = [response.data._id];
      setExperienceData(newExperienceID);
      try {
        const dataToSend = {
          skills: skillID,
          languages: languageID,
          experience: [response.data._id],
        };

        handleInputChange({
          target: {
            name: 'profile.',
            value: dataToSend,
          },
        });
      } catch (error) {
        console.log(error);
        Swal.fire('Error', 'Failed to add data', 'error');
      }
    }
  }
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

      {/* Experience */}
      <div className="flex flex-col items-start w-80">
        <h2 className="text-lg font-bold mb-2">Experience</h2>
        <div className="mb-4 flex flex-col gap-2 items-start w-full">
          <input
            type="text"
            value={projects.companyName}
            onChange={(e) => handleProjectChange('companyName', e.target.value)}
            placeholder="Company Name"
            className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline w-full"
          />
          <input
            type="text"
            value={projects.position}
            onChange={(e) => handleProjectChange('position', e.target.value)}
            placeholder="Position"
            className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline w-full"
          />
          <div className="flex flex-row gap-3 items-start align-middle mt-2 p-1">
            <input
              type="checkbox"
              id="isWorking"
              name="stillWorking"
              checked={isWorking}
              onChange={async (e) => {
                const checked = e.target.checked;
                setIsWorking(checked);
                await setProjects((prevData) => ({
                  ...prevData,
                  stillWorking: checked,
                }));
              }}
              className="mr-2"
            />
            <label htmlFor="isWorking" className="text-gray-700">
              Still Working
            </label>
          </div>
          <div className="flex flex-row gap-3 items-start w-full mt-2">
            <label>Start Date</label>
            <input
              type="date"
              value={projects.startDate}
              onChange={(e) => handleProjectChange('startDate', e.target.value)}
              className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline w-full"
            />
          </div>
          {!isWorking && (
            <div className="flex flex-row gap-3 items-start w-full mt-2">
              <label>End Date</label>
              <input
                type="date"
                value={projects.endDate}
                onChange={(e) => handleProjectChange('endDate', e.target.value)}
                className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline w-full"
              />
            </div>
          )}
          <textarea
            value={projects.tasks}
            onChange={(e) => handleProjectChange('tasks', e.target.value)}
            placeholder="Tasks you were responsible for!"
            className="border rounded px-3 py-1 mb-2 focus:outline-none focus:shadow-outline w-full"
          />
        </div>
      </div>
      <div className="flex flex-row gap-3 items-start align-middle mt-2 p-1">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={completed}
          onChange={async (e) => {
            const checked = e.target.checked;
            setCompleted(checked);
            handleConfirmation(e);
          }}
          className="mr-2"
        />
        <label htmlFor="completed" className="text-gray-700">
          Confirm
        </label>
      </div>
    </div>
  );
};

export default SkillLanguageProjectForm;
