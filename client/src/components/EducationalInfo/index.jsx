// import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr';

const index = ({ setShowEducationalInfoModal, currentUser, university, major, emptyHeadline }) => {
    const [add, setAdd] = useState(false);

    return (
      <div className="bg-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between font-semibold text-lg mb-2">
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
          {major && university ? (
            <div
              className={`relative flex flex-col gap-2 ${
                add && 'outline outline-1 rounded-md'
              }`}
            >
              {add && <div className="absolute -top-[12px] -right-[12px] bg-white p-1.5 rounded-full font-medium cursor-pointer">
                <GrClose className="font-medium" size={15} />
              </div>}
              <div className="flex items-start">
                <div className="w-[100px] font-medium">University</div>
                <span
                  title={university.length > 30 ? university : undefined}
                  className="text-gray-500 max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {university}
                </span>
              </div>
              <div className="flex items-start">
                <div className="w-[100px] font-medium">Major</div>
                <span
                  className="text-gray-500"
                  title={major.length > 30 ? major : undefined}
                >
                  {major}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center my-4 text-lg">{emptyHeadline}</div>
          )}
        </div>
      </div>
    );
};

export default index