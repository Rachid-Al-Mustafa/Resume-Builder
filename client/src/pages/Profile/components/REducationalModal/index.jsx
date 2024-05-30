import { GrClose } from 'react-icons/gr';
import { useContext, useRef, useState, useEffect } from 'react';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { postRequest } from '../../../../utils/requests';
import { handleChange } from '../../../../utils/handleChange';
import { AuthContext } from '../../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const index = ({ setShowREducationalInfoModal, setShowRExperienceModal }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const educationOptions = [
    { id: 1, name: "Bachelor's Degree" },
    { id: 2, name: "Master's Degree" },
    { id: 3, name: 'PhD' },
  ];

  const [uniData, setUniData] = useState([]);
  const [studying, setStudying] = useState(false);
  const [inputs, setInputs] = useState({
    level: educationOptions[0].name,
    highLevel: true,
    graduated: false,
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

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest(
          '/education/populateEducation',
          universityID
        );
        if (response.status === 200) {
          await setUniData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [universityID, userData]);

  const handleRemoveEducation = async (e, index, id) => {
    e.preventDefault();
    try {
      const response = await postRequest(`/education/deleteEducation/${id}`);
      if (response.status === 200) {
        setUniversityID((prev) => prev.filter((_, i) => i !== index));
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

  const handleEditEducationalInfo = async (e) => {
    e.preventDefault();

    const response = await postRequest('/education/createEducation', inputs);
    const newUniversities = [...universityID, response.data._id];

    setUniversityID(newUniversities);

    setInputs({
      level: educationOptions[0].name,
      highLevel: true,
      graduated: false,
      university: '',
      major: '',
      startDate: '',
      endDate: '',
      graduationDate: '',
    });

    const Data = JSON.parse(localStorage.getItem('resumeData'));
    const updatedUserData = {
      ...Data,
      profile: {
        ...Data.profile,
        university: newUniversities,
      },
    };

    try {
      localStorage.setItem('resumeData', JSON.stringify(updatedUserData));
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
        className="flex flex-col h-2/3 gap-6 p-4 bg-white rounded-md w-full max-w-[500px] overflow-scroll overflow-x-hidden"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit Resume Information
          </div>
          <div
            onClick={() => setShowEducationalInfoModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        {uniData.length > 0 &&
          uniData.map((univ, index) => (
            <div
              key={univ._id} // Key is crucial when mapping over items
              className="relative flex flex-col gap-2 outline outline-1 rounded-md m-4"
            >
              <div
                onClick={(e) => handleRemoveEducation(e, index, univ._id)}
                className="absolute -top-[12px] -right-[12px] bg-white p-1.5 rounded-full font-medium cursor-pointer"
              >
                <GrClose className="font-medium" size={15} />
              </div>
              <div className="flex justify-start gap-4">
                <div className="w-[100px] font-medium">University</div>
                <span
                  title={
                    univ.university.length > 30 ? univ.university : undefined
                  }
                  className="text-gray-500 max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {univ.university}
                </span>
              </div>
              <div className="flex justify-start gap-4">
                <div className="w-[100px] font-medium">Major</div>
                <span
                  className="text-gray-500"
                  title={univ.major.length > 30 ? univ.major : undefined}
                >
                  {univ.level}, in {univ.major}
                </span>
              </div>
              {univ.graduated ? (
                <div className="flex justify-start gap-4">
                  <div className="w-[100px] font-medium">Graduation</div>
                  <span className="text-gray-500">
                    {moment(univ.graduationDate).format('DD MMMM YYYY')}
                  </span>
                </div>
              ) : (
                <div className="flex justify-start gap-4">
                  <div className="w-[100px] font-medium">Date</div>
                  <span className="text-gray-500">
                    {console.log(univ.startDate)}
                    {moment(univ.startDate).format('DD MMMM YYYY')} {' - '}
                    {moment(univ.endDate).format('DD MMMM YYYY')}
                  </span>
                </div>
              )}
            </div>
          ))}
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
              onChange={() => {
                const newStudyingState = !studying;
                setStudying(newStudyingState);
                setInputs((inputs) => ({
                  ...inputs,
                  graduated: newStudyingState,
                }));
              }}
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
            className="bg-blue-300 text-white p-2 rounded-md mt-4 font-medium"
          >
            Save changes
          </button>
          <button
            className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
            onClick={() => {
              setShowREducationalInfoModal(false);
              setShowRExperienceModal(true);
            }}
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
