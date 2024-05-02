/* eslint-disable react-hooks/rules-of-hooks */
import { GrClose } from 'react-icons/gr';
// eslint-disable-next-line no-unused-vars
import { useContext, useEffect, useRef, useState } from 'react';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { postRequest } from '../../../../utils/requests';
import { handleChange } from '../../../../utils/handleChange';
// import axios from 'axios';
// import { useDebounce } from 'use-debounce';

const index = ({ setShowEducationalInfoModal }) => {
  // const { user, dispatch } = useContext();
  const { university, major } = {
    university: 'LIU',
    major: 'Computer Science',
  };

  const [inputs, setInputs] = useState({
    university: university || '',
    major: major || '',
  });
  //   const [debouncedValue] = useDebounce(inputs.university, 1000);
  const [universities, setUniversities] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [clicked, setClicked] = useState(false);
  const boxRef = useRef();

  const handleInputsChange = (e) => {
    handleChange(e, setInputs);
    setClicked(false);
  };

  const handleEditEducationalInfo = async () => {
    // dispatch({ type: 'EDIT_EDUCATIONAL_INFO', payload: inputs });
    setShowEducationalInfoModal(false);

    // await postRequest('/user/edit-profile', inputs);
  };

  //   useEffect(() => {
  //     if (inputs.university === '') {
  //       setUniversities([]);
  //     }
  //     const getCountries = async () => {
  //       const { data } = await axios.get(
  //         `http://universities.hipolabs.com/search?name=${debouncedValue}`
  //       );
  //       setUniversities(data);
  //     };
  //     if (debouncedValue !== university && !clicked) {
  //       getCountries();
  //     }
  //   }, [debouncedValue]);

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
              close={universities.length > 0}
              setUniversities={setUniversities}
            />
            {universities.length > 0 && (
              <div className="absolute w-full left-0 right-0 top-20 p-2 rounded-md border-2 bg-white flex flex-col gap-1 max-h-[300px] overflow-scroll scrollbar-hide">
                {universities.map((university, index) => (
                  <h1
                    onClick={() => {
                      setInputs((prev) => ({
                        ...prev,
                        university: university.name,
                      }));
                      setUniversities([]);
                      setClicked(true);
                    }}
                    className="cursor-pointer"
                    key={index}
                  >
                    {university.name}
                  </h1>
                ))}
              </div>
            )}
          </div>
          <Input
            label="Major"
            placeholder="Your Major"
            name="major"
            value={inputs.major}
            handleChange={handleInputsChange}
          />
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
