import { GrClose } from 'react-icons/gr';
import { useContext, useRef, useState, useEffect } from 'react';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { postRequest } from '../../../../utils/requests';
import { handleChange } from '../../../../utils/handleChange';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const index = ({ setShowRExperienceModal }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [working, setWorking] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
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

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest(
          '/experience/experiences',
          experienceID
        );
        if (response.status === 200) {
          await setExperienceData(response.data.populatedData);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [experienceID, userData]);

  const handleRemoveEducation = async (e, index, id) => {
    e.preventDefault();
    try {
      console.log(id);
      const response = await postRequest(`/experience/${id}`);
      if (response.status === 200) {
        setExperienceID((prev) => prev.filter((_, i) => i !== index));
        console.log('Successfully deleted education');
      }
    } catch (error) {
      console.error('Error removing education:', error);
    }
  };

  const handleInputsChange = (e) => {
    handleChange(e, setInputs);
    setClicked(false);
  };

  const handleEditExperienceInfo = async (e) => {
    e.preventDefault();
    dispatch({ type: 'EDIT_EXPERIENCE_INFO', payload: inputs }); 
    const Data = JSON.parse(localStorage.getItem('resumeData'));

    const response = await postRequest('/experience/experience', inputs);
    const newExperience = [...experienceID, response.data._id];
    await setExperienceID(newExperience);

    const updatedUserData = {
      ...Data,
      profile: {
        ...Data.profile,
        experience: newExperience,
      },
    };

    setInputs({
      stillWorking: false,
      position: '',
      companyName: '',
      tasks: '',
      startDate: '',
      endDate: '',
    });

    try {
      localStorage.setItem('resumeData', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error('Error updating educational info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowRExperienceModal);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
    >
      <form
        onSubmit={handleEditExperienceInfo}
        ref={boxRef}
        className="flex flex-col h-2/3 gap-6 p-4 bg-white rounded-md w-full max-w-[500px] overflow-scroll overflow-x-hidden"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit Experience Information
          </div>
          <div
            onClick={() => setShowRExperienceModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        {experienceData?.length > 0 &&
          experienceData.map((exp, index) => (
            <div
              key={exp._id}
              className="relative flex flex-col gap-2 outline outline-1 rounded-md m-4"
            >
              <div
                onClick={(e) => handleRemoveEducation(e, index, exp._id)}
                className="absolute -top-[12px] -right-[12px] bg-white p-1.5 rounded-full font-medium cursor-pointer"
              >
                <GrClose className="font-medium" size={15} />
              </div>
              <div className="flex justify-start gap-4">
                <div className="w-[100px] font-medium">Company</div>
                <span
                  title={
                    exp.companyName.length > 30 ? exp.companyName : undefined
                  }
                  className="text-gray-500 justify-start max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {exp.companyName}
                </span>
              </div>
              <div className="flex justify-start gap-4">
                <div className="w-[100px] font-medium">Position</div>
                <span
                  className="text-gray-500"
                  title={exp.position.length > 30 ? exp.position : undefined}
                >
                  {exp.position}
                </span>
              </div>
              {exp.stillWorking ? (
                <div className="flex justify-start gap-4">
                  <div className="w-[100px] font-medium">Started In</div>
                  <span className="text-gray-500">
                    {moment(exp.startDate).format('DD MMMM YYYY')}
                  </span>
                </div>
              ) : (
                <div className="flex justify-start gap-4">
                  <div className="w-[100px] font-medium">Duration</div>
                  <span className="text-gray-500">
                    {moment(exp.startDate).format('DD MMMM YYYY')}
                    {' - '}
                    {moment(exp.endDate).format('DD MMMM YYYY')}
                  </span>
                </div>
              )}
            </div>
          ))}
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
          <button
            onClick={navigate('/Templates')}
            className="bg-green-400 text-white p-2 rounded-md mt-4 font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
