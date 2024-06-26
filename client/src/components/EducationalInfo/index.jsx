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
  setShowEducationalInfoModal,
  currentUser,
  uni,
  emptyHeadline,
}) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [uniID, setUniID] = useState(uni);
  const [uniData, setUniData] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest(
          '/education/populateEducation',
          uniID
        );
        if (response.status === 200) {
          await setUniData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [uniID, userData]);

  const handleRemoveEducation = async (e, index, id) => {
    e.preventDefault();
    try {
      const response = await postRequest(`/education/deleteEducation/${id}`);
      if (response.status === 200) {
        setUniID((prev) => prev.filter((_, i) => i !== index));
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
          <span className="text-primary">Educational Information</span>{' '}
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
                    onClick={() => setShowEducationalInfoModal(true)}
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
        {uniData.length > 0 ? (
          uniData.map((univ, index) => (
            <div
              key={univ._id} // Key is crucial when mapping over items
              className={`relative flex flex-col gap-2 ${
                add && 'outline outline-1 rounded-md m-4'
              }`}
            >
              {add && (
                <div
                  onClick={(e) => handleRemoveEducation(e, index, univ._id)}
                  className="absolute -top-[12px] -right-[12px] bg-white p-1.5 rounded-full font-medium cursor-pointer"
                >
                  <GrClose className="font-medium" size={15} />
                </div>
              )}
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
          ))
        ) : (
          <div className="text-center my-4 text-lg">{emptyHeadline}</div>
        )}
      </div>
    </div>
  );
};

export default index;
