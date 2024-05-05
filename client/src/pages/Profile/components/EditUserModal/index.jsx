import { GrClose } from 'react-icons/gr';
import Input from '../../../../components/input';
import { handleCloseModal } from '../../../../utils/closeModal';
import { useContext, useEffect, useRef, useState } from 'react';
import { handleChange } from '../../../../utils/handleChange';
import { postRequest } from '../../../../utils/requests';
import { AuthContext } from '../../../../Context/AuthContext';
import axios from 'axios';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const index = ({ setShowEditUserModal }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: userData } = user;

  const [inputs, setInputs] = useState({
    name: userData.name || '',
    phone: userData.phone || '',
    location: userData.profile.location || '',
    bio: userData.profile.bio || '',
  });

  const boxRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUserInfo = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      ...userData,
      name: inputs.name,
      phone: inputs.phone,
      profile: {
        ...userData.profile,
        location: inputs.location,
        bio: inputs.bio,
      },
    };

    try {
      dispatch({ type: 'EDIT_USER_INFO', payload: updatedUserData });

      const response = await postRequest('/user/edit-profile', updatedUserData);

      if (response.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response });
        setShowEditUserModal(false);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const closeModal = (e) => handleCloseModal(e, boxRef, setShowEditUserModal);

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
    >
      <form
        onSubmit={handleEditUserInfo}
        ref={boxRef}
        className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[650px]"
      >
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="text-lg font-semibold text-primary">
            Edit your profile data
          </div>
          <div
            onClick={() => setShowEditUserModal(false)}
            className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
          >
            <GrClose size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Input
            label="Name"
            name="name"
            placeholder="Your Name"
            value={inputs.name}
            handleChange={handleInputChange}
          />
          <Input
            label="Location"
            name="location"
            placeholder="Your Location"
            value={inputs.location}
            handleChange={handleInputChange}
          />
          <Input
            label="Phone"
            name="phone"
            placeholder="Your Phone Number"
            value={inputs.phone}
            handleChange={handleInputChange}
          />
          {/* <GooglePlacesAutocomplete
            apiKey="AIzaSyDnPR28CLrGzTeXpjJtKM_Gasr79C6Yky0"
            selectProps={{
              value,
              onChange: setValue,
            }}
          /> */}
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="about">
              About
            </label>
            <textarea
              id="about"
              name="bio"
              placeholder="Descripe Yourself!"
              className="p-2 rounded-md border-2 bg-transparent outline-none scrollbar-hide h-[100px]"
              type="text"
              value={inputs.bio}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-blue-400 text-white p-2 rounded-md mt-4 font-medium"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default index;
