import { useEffect, useState, useContext } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { HiPencil } from 'react-icons/hi';
import Button from '../ShowCommunites/UI/Button';
// import Skill from '../../pages/Profile/components/Skill';
import { GrClose } from 'react-icons/gr';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { postRequest } from '../../utils/requests';
import { AuthContext } from '../../Context/AuthContext';

const index = ({
  data,
  maxDataToShow,
  text,
  emptyHeadline,
  setShowModal,
  currentUser,
}) => {
  const [showAllData, setShowAllData] = useState(false);
  const [remove, setRemove] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [skillsData, setSkillsData] = useState(data);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await postRequest('/skill/getSkills', data);
        if (response.status === 200) {
          await setSkillsData(response.data.skills);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [data]);

  return (
    <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
      <div className="text-xl font-semibold flex items-center justify-between">
        <div className="text-primary">{text}</div>
        {currentUser && (
          <HiPencil
            onClick={() => setShowModal(true)}
            className="cursor-pointer"
            size={30}
          />
        )}
      </div>
      <div className="flex items-center flex-wrap gap-4 py-3.5 overflow-x-hidden">
        {skillsData?.length > 0 ? (
          skillsData
            .slice(0, showAllData ? skillsData?.length : maxDataToShow)
            .map((skill, index) => (
              <div
                className={
                  skill.level === 'Beginner'
                    ? 'bg-red-400'
                    : skill.level === 'Basic'
                    ? 'bg-orange-400'
                    : skill.level === 'Good'
                    ? 'bg-gray-400'
                    : skill.level === 'Advance'
                    ? 'bg-green-400'
                    : 'bg-blue-400'
                }
                key={index}
              >
                <div className="relative flex items-center gap-2 py-2 px-4 rounded-md border-2">
                  {skill.name}
                </div>
              </div>
            ))
        ) : (
          <h1 className="my-2 text-lg">{emptyHeadline}</h1>
        )}
      </div>
      {skillsData?.length > maxDataToShow && (
        <div>
          {showAllData ? (
            <Button
              text={'Show less'}
              icon={<BsChevronUp />}
              setShowAllData={setShowAllData}
            />
          ) : (
            <Button
              text={'Show more'}
              icon={<BsChevronDown />}
              setShowAllData={setShowAllData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default index;
