import { GrClose } from 'react-icons/gr';
import { useContext, useRef, useState } from 'react';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { postRequest } from '../../../../utils/requests';
import { handleChange } from '../../../../utils/handleChange';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = ({ setShowEducationalInfoModal }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const educationOptions = [
    { id: 1, name: "Bachelor's Degree" },
    { id: 2, name: "Master's Degree" },
    { id: 3, name: 'PhD' },
  ];

  const [studying, setStudying] = useState(false);
  const [inputs, setInputs] = useState({
    level: educationOptions[0].name,
    highLevel: true,
    graduated: !studying,
    university: '',
    major: '',
    startDate: '',
    endDate: '',
    graduationDate: '',
  });
  const [universityID, setUniversityID] = useState(
    userData.profile.university || []
  );
  const [clicked, setClicked] = useState(false);
  const boxRef = useRef();

  const handleInputsChange = (e) => {
    handleChange(e, setInputs);
    setClicked(false);
  };

  const handleEditEducationalInfo = async (e) => {
    e.preventDefault();
    dispatch({ type: 'EDIT_EDUCATIONAL_INFO', payload: inputs });

    const response = await postRequest('/education/createEducation', inputs);
    const newUniversities = [...universityID, response.data._id];
    await setUniversityID(newUniversities);

    const updatedUserData = {
      ...userData,
      profile: {
        ...userData.profile,
        university: newUniversities,
      },
    };

    try {
      const response2 = await postRequest(
        '/user/edit-profile',
        updatedUserData
      );
      if (response2.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response2 });
        setShowEducationalInfoModal(false);
        navigate(0);
      }
    } catch (error) {
      console.error('Error updating educational info:', error);
    }
  };

  const closeModal = (e) =>
    handleCloseModal(e, boxRef, setShowEducationalInfoModal);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
    >
      <form
        onSubmit={handleEditEducationalInfo}
        ref={boxRef}
        className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[500px]"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit educational information
          </div>
          <div
            onClick={() => setShowEducationalInfoModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Input
              label="University"
              placeholder="Your University"
              name="university"
              value={inputs.university}
              handleChange={handleInputsChange}
            />
          </div>
          <Input
            label="Major"
            placeholder="Your Major"
            name="major"
            value={inputs.major}
            handleChange={handleInputsChange}
          />
          <label className="text-gray-700 text-sm font-bold mt-2">
            Level of Education
          </label>
          <select
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputs.level}
            name="level"
            onChange={(e) => handleInputsChange(e)}
          >
            {educationOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isStudying"
              checked={studying}
              onChange={() => setStudying(!studying)}
              className="mr-2"
            />
            <label htmlFor="isStudent" className="text-gray-700">
              Still Studying
            </label>
          </div>
          {studying ? (
            <Input
              label="Expected Graduation Date"
              type="date"
              name="graduationDate"
              value={inputs.graduationDate}
              handleChange={handleInputsChange}
            />
          ) : (
            <>
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={inputs.startDate}
                handleChange={handleInputsChange}
              />
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={inputs.endDate}
                handleChange={handleInputsChange}
              />
            </>
          )}
          <button
            type="submit"
            className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
