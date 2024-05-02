/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { HiPencil } from 'react-icons/hi';
import Button from '../ShowCommunites/UI/Button';
// import Skill from '../../pages/Profile/components/Skill';
import { GrClose } from 'react-icons/gr';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoCloseCircleSharp } from 'react-icons/io5';

const index = ({
  data,
  maxDataToShow,
  handleRemoveSkill,
  text,
  emptyHeadline,
  setShowModal,
  currentUser,
}) => {
  const [showAllData, setShowAllData] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
      <div className="text-xl font-semibold flex items-center justify-between">
        <div className="text-primary">{text}</div>
        {currentUser &&
          (!remove ? (
            <HiPencil
              onClick={() => setRemove(true)}
              className="cursor-pointer"
              size={30}
            />
          ) : (
            <>
              <div className="flex flex-row gap-1">
                <IoAddCircleSharp
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer"
                  size={30}
                />
                <IoCloseCircleSharp
                  onClick={() => setRemove(false)}
                  className="cursor-pointer"
                  size={30}
                />
              </div>
            </>
          ))}
      </div>
      <div className="flex items-center flex-wrap gap-4 py-3.5 overflow-x-hidden">
        {data?.length > 0 ? (
          data
            .slice(0, showAllData ? data?.length : maxDataToShow)
            .map((skill, index) => (
              <div key={index}>
                <div className="relative flex items-center gap-2 py-2 px-4 rounded-md border-2">
                  {skill}
                  {remove && (
                    <div
                      onClick={() => handleRemoveSkill(index)}
                      className="absolute -top-[12px] -right-[12px] bg-gray-200 p-1.5 rounded-full font-medium cursor-pointer dark:bg-white"
                    >
                      <GrClose className="font-medium" size={15} />
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <h1 className="my-2 text-lg">{emptyHeadline}</h1>
        )}
      </div>
      {data?.length > maxDataToShow && (
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
