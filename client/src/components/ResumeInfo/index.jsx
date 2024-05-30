import { useEffect, useState, useContext } from 'react';
import { HiPencil } from 'react-icons/hi';
import { IoAddCircleSharp } from 'react-icons/io5';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { postRequest } from '../../utils/requests';
import Swal from 'sweetalert2';

const index = ({
  setShowResumesModal,
  currentUser,
  resumes,
  emptyHeadline,
}) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;
  const navigate = useNavigate();

  const [resumesID, setResumesID] = useState(resumes);
  const [resumeData, setResumeData] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await postRequest(
          '/resume/resumes',
          resumesID
        );
        if (response.status === 200) {
          await setResumeData(response.data.populatedData);
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, [resumesID, userData]);

  const handleRemoveResume = async (e, index, id) => {
    e.preventDefault();
    try {
      const response = await postRequest(`/resume/${id}`);
      if (response.status === 200) {
        setResumesID((prev) => prev.filter((_, i) => i !== index));
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
          <span className="text-primary">My Resumes</span>{' '}
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
                    onClick={() => {
                      Swal.fire({
                        title: 'Do you want to use default data?',
                        showDenyButton: true,
                        confirmButtonText: 'Yes',
                        denyButtonText: 'No',
                        customClass: {
                          actions: 'my-actions',
                          cancelButton: 'order-1 right-gap',
                          confirmButton: 'order-2',
                          denyButton: 'order-3',
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate('/Templates');
                        } else if (result.isDenied) {
                          setShowResumesModal(true);
                        }
                      });
                    }}
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
        {resumeData?.length > 0 ? (
          resumeData.map((res, index) => (
            <div
              key={res._id}
              className={`relative flex flex-col gap-2 ${
                add && 'outline outline-1 rounded-md m-4'
              }`}
            >
              {add && (
                <div
                  onClick={(e) => handleRemoveResume(e, index, res._id)}
                  className="absolute -top-[12px] -right-[12px] bg-white p-1.5 rounded-full font-medium cursor-pointer"
                >
                  <GrClose className="font-medium" size={15} />
                </div>
              )}
              <div className="flex justify-start gap-4">
                <div className="w-[100px] font-medium">Resume</div>
                <span
                  title={
                    res.resumeName.length > 30 ? res.resumeName : undefined
                  }
                  className="text-gray-500 justify-start max-w-[270px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {res.resumeName}
                </span>
              </div>
              
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
