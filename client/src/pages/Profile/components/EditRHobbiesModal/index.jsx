import { useContext, useEffect, useRef, useState } from 'react';
import { handleCloseModal } from '../../../../utils/closeModal';
import { GrClose } from 'react-icons/gr';
import Skill from '../Skill';
import { AuthContext } from '../../../../Context/AuthContext';
import { postRequest } from '../../../../utils/requests';
import { useNavigate } from 'react-router-dom';

const index = ({ setShowRHobbiesModal, setShowREducationalInfoModal, hobbies }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [HobbyInput, setHobbyInput] = useState('');
  const boxRef = useRef();

  useEffect(() => {
    setSelectedHobbies(hobbies);
  }, [hobbies]);

  const handleRemoveHobby = (e, Index) => {
    e.preventDefault();

    setSelectedHobbies((prev) =>
      prev.filter((skill, index) => index !== Index)
    );
  };

  const handleAddSkill = (e) => {
    e.preventDefault();

    if (HobbyInput.trim() !== '') {
      setSelectedHobbies([HobbyInput.trim(), ...selectedHobbies]);
      setHobbyInput('');
    }
  };

  const handleEditSkills = async (e) => {
    e.preventDefault();
    const Data = JSON.parse(localStorage.getItem('resumeData'));
    const updatedUserData = {
      ...Data,
      profile: {
        ...Data.profile,
        hobbies: selectedHobbies,
      },
    };

    try {
      localStorage.setItem('resumeData', JSON.stringify(updatedUserData));
      setShowRHobbiesModal(false);
      setShowREducationalInfoModal(true);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowRHobbiesModal);

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
            Edit your hobbies
          </div>
          <div
            onClick={() => setShowRHobbiesModal(false)}
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
              placeholder="Add Hobbies"
              value={HobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
            />
          </form>
          {selectedHobbies?.length > 0 && (
            <div className="flex items-center flex-wrap gap-4 py-3.5 max-h-[300px] overflow-y-scroll overflow-x-hidden scrollbar-hide">
              {selectedHobbies?.map((skill, index) => (
                <div
                  index={index}
                  key={index}
                  onClick={(e) => handleRemoveHobby(e, index)}
                >
                  <Skill skill={skill} remove={true} />
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleAddSkill}
            className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
          >
            Add Hobby
          </button>
          <button
            onClick={(e) => handleEditSkills(e)}
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
