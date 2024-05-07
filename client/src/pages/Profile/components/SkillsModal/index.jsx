import { useContext, useEffect, useRef, useState } from 'react';
import { handleCloseModal } from '../../../../utils/closeModal';
import { GrClose } from 'react-icons/gr';
import Skill from './../Skill';
import { postRequest } from '../../../../utils/requests';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = ({ setShowSkillsModal, skills }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const Levels = ['Beginner', 'Basic', 'Good', 'Advance', 'Expert'];

  const [selectedSkills, setSelectedSkills] = useState(skills);
  const [skillInput, setSkillInput] = useState('');
  const boxRef = useRef();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [skillID, setSkilID] = useState([...skills]);
  const [skillsData, setSkillsData] = useState(selectedSkills);

   useEffect(() => {
     const fetchSkills = async () => {
       try {
         const response = await postRequest('/skill/getSkills', skills);
         if (response.status === 200) {
           await setSkillsData(response.data.skills);
         }
       } catch (error) {
         console.error('Error fetching skills:', error);
       }
     };

     fetchSkills();
   }, [selectedSkills, skillInput]);

  const handleRemoveSkill = async (e, Index) => {
    e.preventDefault();
    console.log(selectedSkills);
    setSelectedSkills((prev) => {
      if (Index >= 0 && Index < prev.length) {
        return prev.filter((_, i) => i !== Index);
      }
      return prev;
    });
    console.log(selectedSkills);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (skillInput.trim() !== '' && selectedLevel.trim() !== '') {
      const newSkill = {
        name: skillInput.trim(),
        level: selectedLevel.trim(),
      };
      console.log(newSkill);
      const response = await postRequest('/skill/create', newSkill);
      if (response.status === 200) {
        console.log(response.data.skill._id)
        const newSkillID = [response.data.skill._id, ...skillID];
        console.log(newSkillID);
        await setSkilID(newSkillID);
        console.log(skillID);
        await setSelectedSkills([newSkill, ...selectedSkills]);
        setSkillInput('');
        setSelectedLevel('Beginner');
      }
    }
  };

  const handleEditSkills = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      ...userData,
      profile: {
        ...userData.profile,
        skills: skillID,
      },
    };

    console.log(updatedUserData);

    try {
      dispatch({
        type: 'EDIT_SKILLS',
        payload: updatedUserData.profile.skills,
      });

      const response = await postRequest('/user/edit-profile', updatedUserData);
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response });
        setShowSkillsModal(false);
        navigate(0);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowSkillsModal);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2  overflow-hidden max-h-screen"
    >
      <div
        ref={boxRef}
        className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[650px]"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit your skills
          </div>
          <div
            onClick={() => setShowSkillsModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <form
            onSubmit={handleAddSkill}
            className="flex gap-2 p-2 rounded-md border-2"
          >
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
          </form>
          {skillsData?.length > 0 && (
            <div className="flex items-center flex-wrap gap-4 py-3.5 max-h-[300px] overflow-y-scroll overflow-x-hidden scrollbar-hide">
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
          <button
            onClick={handleAddSkill}
            className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
          >
            Add Skill
          </button>
          <button
            onClick={(e) => handleEditSkills(e)}
            className="bg-blue-500 text-white p-2 rounded-md mt-4 font-medium"
          >
            Save changes
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default index;
