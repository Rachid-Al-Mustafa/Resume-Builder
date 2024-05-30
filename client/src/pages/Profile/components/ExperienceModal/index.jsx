import { GrClose } from 'react-icons/gr';
import { useContext, useRef, useState } from 'react';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { postRequest } from '../../../../utils/requests';
import { handleChange } from '../../../../utils/handleChange';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = ({ setShowExperienceModal }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [working, setWorking] = useState(false);
  const [inputs, setInputs] = useState({
    stillWorking: false,
    position: '',
    companyName: '',
    tasks: '',
    startDate: '',
    endDate: '',
  });
  const [experienceID, setExperienceID] = useState(
    userData.profile.experience || []
  );
  const [clicked, setClicked] = useState(false);
  const boxRef = useRef();

  const handleInputsChange = (e) => {
    handleChange(e, setInputs);
    setClicked(false);
  };

  const handleEditExperienceInfo = async (e) => {
    e.preventDefault();
    dispatch({ type: 'EDIT_EXPERIENCE_INFO', payload: inputs }); 

    const response = await postRequest('/experience/experience', inputs);
    console.log(response);
    const newExperience = [...experienceID, response.data._id];
    await setExperienceID(newExperience);

    const updatedUserData = {
      ...userData,
      profile: {
        ...userData.profile,
        experience: newExperience,
      },
    };

    try {
      const response2 = await postRequest(
        '/user/edit-profile',
        updatedUserData
      );
      if (response2.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response2 });
        handleEditExperienceInfo(false);
        navigate(0);
      }
    } catch (error) {
      console.error('Error updating educational info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowExperienceModal);

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
            Edit Experience Information
          </div>
          <div
            onClick={() => setShowExperienceModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Input
              label="Company"
              placeholder="Your Company Name"
              name="companyName"
              value={inputs.university}
              handleChange={handleInputsChange}
            />
          </div>
          <Input
            label="Position"
            placeholder="Your Position"
            name="position"
            value={inputs.major}
            handleChange={handleInputsChange}
          />
          <textarea
            className="flex-1 px-4 py-3.5 rounded-md border-[2px] border-grayMedium bg-grayLight placeholder:text-[#8590AA] bg-transparent font-medium"
            label="Tasks"
            placeholder="Tasks you where in charge of"
            name="tasks"
            value={inputs.tasks}
            onChange={handleInputsChange}
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isWorking"
              checked={working}
              onChange={() => {
                const newWorkingState = !working;
                setWorking(newWorkingState);
                setInputs((inputs) => ({
                  ...inputs,
                  stillWorking: newWorkingState,
                }));
              }}
              className="mr-2"
            />
            <label htmlFor="isWorking" className="text-gray-700">
              Still Working
            </label>
          </div>
          {working ? (
            <Input
              label="Employment Date"
              type="date"
              name="startDate"
              value={inputs.startDate}
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
