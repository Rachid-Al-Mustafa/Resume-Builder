import { GrClose } from 'react-icons/gr';
import { handleCloseModal } from '../../../../utils/closeModal';
import { useContext, useEffect, useRef, useState } from 'react';
import { postRequest } from '../../../../utils/requests';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Skill from '../Skill';

const index = ({ setShowRLanguagesModal, setShowRHobbiesModal, languages }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const Levels = ['Beginner', 'Basic', 'Good', 'Advance', 'Expert'];

  const boxRef = useRef();
  const [languageInput, setLanguageInput] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [languageID, setLanguageID] = useState([...languages]);
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest('/skill/getSkills', languageID);

        if (response.status === 200) {
          await setLanguageData(response.data.skills);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchSkills();
  }, [languageID, languageInput]);

  const handleRemoveLanguage = async (e, Index) => {
    e.preventDefault();
    setLanguageID((prev) => {
      if (Index >= 0 && Index < prev.length) {
        const newLanguages = prev.filter((_, i) => i !== Index);
        return newLanguages;
      }
      return prev;
    });
  };

  const handleAddLanguage = async (e) => {
    e.preventDefault();

    if (languageInput.trim() !== '' && selectedLevel.trim() !== '') {
      const newLanguage = {
        name: languageInput.trim(),
        level: selectedLevel.trim(),
      };
      const response = await postRequest('/skill/create', newLanguage);
      if (response.status === 200) {
        const newLanguageID = [...languageID, response.data.skill._id];
        await setLanguageID(newLanguageID);
        setLanguageInput('');
        setSelectedLevel('Beginner');
      }
    }
  };

  const handleEditLanguages = async (e) => {
    e.preventDefault();
    const Data = JSON.parse(localStorage.getItem('resumeData'));
    const updatedUserData = {
      ...Data,
      profile: {
        ...Data.profile,
        languages: languageID,
      },
    };

    try {
      localStorage.setItem('resumeData', JSON.stringify(updatedUserData));
      setShowRLanguagesModal(false);
      setShowRHobbiesModal(true);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowRLanguagesModal);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
    >
      <div
        ref={boxRef}
        className="flex flex-col h-auto gap-6 p-4 bg-white rounded-md w-full max-w-[500px]"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit languages
          </div>
          <div
            onClick={() => setShowRLanguagesModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <form
            onSubmit={handleAddLanguage}
            className="flex gap-2 p-2 rounded-md border-2"
          >
            <input
              className="placeholder:text-gray-500 font-medium flex-1 outline-none bg-transparent"
              type="text"
              placeholder="Add Language"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
            />
            <select value={selectedLevel} onChange={handleLevelChange}>
              {Levels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </form>
          {languageData?.length > 0 && (
            <div className="flex items-center flex-wrap gap-4 py-3.5 max-h-[300px] overflow-y-scroll overflow-x-hidden scrollbar-hide">
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
          <button
            onClick={handleAddLanguage}
            className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
          >
            Add Language
          </button>
          <button
            onClick={(e) => handleEditLanguages(e)}
            className="bg-blue-500 text-white p-2 rounded-md mt-4 font-medium"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
