import { GrClose } from 'react-icons/gr';
import { useContext, useRef, useState } from 'react';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { postRequest } from '../../../../utils/requests';
import { handleChange } from '../../../../utils/handleChange';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = ({ setShowResumesModal, setShowSecondStep }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(userData);
  const boxRef = useRef();

  const handleInputsChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
      profile: {
        ...prev.profile,
        [name]: value,
      },
    }));
  };

  const handleEditExperienceInfo = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem('resumeData', JSON.stringify(inputs));
      setShowResumesModal(false);
      setShowSecondStep(true);
    } catch (error) {
      console.error('Error updating educational info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowResumesModal);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
    >
      <form
        onSubmit={handleEditExperienceInfo}
        ref={boxRef}
        className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[500px]"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit Resume Information
          </div>
          <div
            onClick={() => setShowResumesModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="Name"
            name="name"
            placeholder="Your Name"
            value={inputs.name}
            handleChange={handleInputsChange}
          />
          <Input
            label="Location"
            name="location"
            placeholder="Your Location"
            value={inputs.profile.location}
            handleChange={handleInputsChange}
          />
          <Input
            label="Phone"
            name="phone"
            placeholder="Your Phone Number"
            value={inputs.phone}
            handleChange={handleInputsChange}
          />
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="about">
              About
            </label>
            <textarea
              id="about"
              name="bio"
              placeholder="Descripe Yourself!"
              className="p-2 rounded-md border-2 bg-transparent outline-none scrollbar-hide h-[100px]"
              type="text"
              value={inputs.profile.bio}
              onChange={handleInputsChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
