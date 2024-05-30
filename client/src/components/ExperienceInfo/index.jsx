import { useEffect, useState, useContext } from 'react';
import { HiPencil } from 'react-icons/hi';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { postRequest } from '../../utils/requests';
import moment from 'moment';

const index = ({
  setShowExperienceModal,
  currentUser,
  experience,
  emptyHeadline,
}) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [experienceID, setExperienceID] = useState(experience);
  const [experienceData, setExperienceData] = useState([]);

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

  const [add, setAdd] = useState(false);

  return (
    <div className="bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between font-semibold text-lg mb-2">
          <span className="text-primary">Experience Information</span>{' '}
          {currentUser &&
            (!add ? (
              <HiPencil
                onClick={() => setAdd(true)}
                className="cursor-pointer"
                size={30}
              />
            ) : (
              <>
                <div className="flex flex-row gap-1">
                  <IoAddCircleSharp
                    onClick={() => setShowExperienceModal(true)}
                    className="cursor-pointer"
                    size={30}
                  />
                  <IoCloseCircleSharp
                    onClick={() => setAdd(false)}
                    className="cursor-pointer"
                    size={30}
                  />
                </div>
              </>
            ))}
        </div>
        {experienceData?.length > 0 ? (
          experienceData.map((exp, index) => (
            <div
              key={exp._id}
              className={`relative flex flex-col gap-2 ${
                add && 'outline outline-1 rounded-md m-4'
              }`}
            >
              {add && (
                <div
                  onClick={(e) => handleRemoveEducation(e, index, exp._id)}
                  className="absolute -top-[12px] -right-[12px] bg-white p-1.5 rounded-full font-medium cursor-pointer"
                >
                  <GrClose className="font-medium" size={15} />
                </div>
              )}
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
          ))
        ) : (
          <div className="text-center my-4 text-lg">{emptyHeadline}</div>
        )}
      </div>
    </div>
  );
};

export default index;
