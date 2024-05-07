import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { handleCloseModal } from '../../../../utils/closeModal';
import { useContext, useEffect, useRef, useState } from 'react';
import { languagesData } from './../../../../utils/LanguagesData';
import Language from './../Language';
import { postRequest } from '../../../../utils/requests';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = ({ setShowLanguagesModal, languages }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const Levels = ['Beginner', 'Basic', 'Good', 'Advance', 'Expert'];

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  let [showLanguagesList, setShowLanguagesList] = useState(false);
  const boxRef = useRef();
  const [selectedLangauge, setSelectedLangauge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [languageID, setLanguageID] = useState([...languages]);
  const [languageData, setLanguageData] = useState(selectedLanguages);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest('/skill/getSkills', languages);
        if (response.status === 200) {
          await setSkillsData(response.data.languages);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [selectedSkills, skillInput]);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedLanguages((prev) => [...prev, language]); // Spread existing array, add new item
    } else {
      setSelectedLanguages((prev) => prev.filter((lang) => lang !== language)); // Remove item
    }
  };

  const handleEditLanguages = async () => {
    // dispatch({type: "EDIT_LANGUAGES", payload: selectedLanguages});
    setShowLanguagesModal(false);

    await postRequest('/user/edit-profile', { languages: selectedLanguages });
  };

  const handleRemoveLanguage = async (e, Index) => {
    e.preventDefault();
    setSelectedLanguages((prev) => {
      if (Index >= 0 && Index < prev.length) {
        return prev.filter((_, i) => i !== Index);
      }
      return prev;
    });
  };

  const handleAddLanguage = async (e) => {
    e.preventDefault();

    if (selectedLangauge.trim() !== '' && selectedLangauge.trim() !== '') {
      const newLanguage = {
        name: selectedLangauge.trim(),
        level: selectedLevel.trim(),
      };
      const response = await postRequest('/skill/create', newLanguage);
      if (response.status === 200) {
        console.log(response.data.skill._id);
        const newLanguageID = [response.data.skill._id, ...skillID];
        await setLanguageID(newLanguageID);
        await setSelectedSkills([newLanguage, ...selectedLanguages]);
        setSelectedLangauge('');
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
        languages: languageID,
      },
    };

    try {
      dispatch({
        type: 'EDIT_LANGUAGES',
        payload: updatedUserData.profile.languages,
      });

      const response = await postRequest('/user/edit-profile', updatedUserData);
      if (response.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response });
        setShowLanguagesModal(false);
        navigate(0);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowLanguagesModal);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
    >
      <div
        ref={boxRef}
        className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[500px]"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit languages
          </div>
          <div
            onClick={() => setShowLanguagesModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative flex flex-col gap-1 mt-2">
            <label className="text-4 font-medium" htmlFor="languages">
              Languages
            </label>
            <div
              onClick={() => setShowLanguagesList((prev) => !prev)}
              className="p-2 rounded-md border-2 flex items-center justify-between cursor-pointer select-none"
            >
              Select languages
              <div className="flex items-center justify-center">
                {showLanguagesList ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </div>
            </div> 
            {showLanguagesList && (
              <div className="absolute w-full left-0 right-0 top-20 p-2 rounded-md border-2 bg-white flex flex-col gap-1 max-h-[200px] overflow-scroll scroll-smooth">
                {languagesData?.map((language) => (
                  <Language
                    key={language.id}
                    label={language.label}
                    checked={selectedLanguages?.includes(language.label)}
                    onChange={handleLanguageChange}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center flex-wrap gap-2 mt-2">
              {selectedLanguages?.map((lang, index) => (
                <div
                  className="py-1 px-4 rounded-md border-2 dark:border-black"
                  key={index}
                >
                  {lang}
                </div>
              ))}
            </div>
            <button
              onClick={handleEditLanguages}
              className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
