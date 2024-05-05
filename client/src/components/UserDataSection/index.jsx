import { useEffect, useRef, useState, useContext } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getRequest, postRequest } from '../../utils/requests';
import { AuthContext } from '../../Context/AuthContext';
import { imageDB } from '../../utils/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import ProfilePicture from '../../assets/hero.png';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';

const index = ({ setShowEditUserModal, user, isCurrentUser }) => {
  const { dispatch } = useContext(AuthContext);

  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();

  const coverPicInputRef = useRef();
  const profilePicInputRef = useRef();
  const coverImgRef = useRef();
  const profileImgRef = useRef();

  const handleInput = (e, image) => {
    if (e.target.files.length > 0) {
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }
      getBase64(e.target.files[0]).then(async (data) => {
        if (image === 'cover') {
          coverImgRef.current.src = data;
          dispatch({
            type: 'EDIT_PROFILE_IMAGES',
            payload: {
              coverImage: data,
            },
          });
        } else {
          profileImgRef.current.src = data;
          dispatch({
            type: 'EDIT_PROFILE_IMAGES',
            payload: {
              profileImage: data,
            },
          });
        }
      });

      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageUpload = async (image, imageKey) => {
    if (image) {
      try {
        const imgRef = ref(imageDB, `files/${v4()}`);
        const snapshot = await uploadBytes(imgRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await postRequest(`/user/edit-profile`, { [imageKey]: downloadURL });
      } catch (error) {
        console.log(`Error uploading ${imageKey} image: `, error);
      }
    }
  };

  useEffect(() => {
    if (profileImg) {
      handleImageUpload(profileImg, 'profileImage');
    }
    if (coverImg) {
      handleImageUpload(coverImg, 'coverImage');
    }
  }, [profileImg, coverImg]);

  return (
    <div className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
      <div className="relative">
        <img
          ref={coverImgRef}
          className="h-[200px] w-full object-cover rounded-md"
          src={
            user?.profile?.coverImage ||
            'https://img.freepik.com/free-photo/landscape-lake-surrounded-by-mountains_23-214' +
              '8215162.jpg?w=1060&t=st=1693667013~exp=1693667613~hmac=cbe76fdbc4c315a22be951804' +
              '9b4ce73ba01a29d7839bc73212e6627c7fe2bd3'
          }
          alt="cover-picture"
        />
        <img
          ref={profileImgRef}
          onClick={() => isCurrentUser && profilePicInputRef.current.click()}
          className={`absolute w-[160px] h-[160px] rounded-full object-cover -bottom-[25%] left-[5%] border-[5px] border-white ${
            isCurrentUser && 'cursor-pointer'
          }`}
          src={user?.data?.profile?.profileImage || ProfilePicture}
          alt="profile-picture"
        />
        <input
          onChange={(e) => {
            setProfileImg(e.target.files[0]);
            handleInput(e, 'profile');
          }}
          ref={profilePicInputRef}
          type="file"
          className="hidden"
        />{' '}
        {isCurrentUser && (
          <div
            onClick={() => coverPicInputRef.current.click()}
            className="absolute w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full top-2 right-2 cursor-pointer"
          >
            <HiPencil className="text-primary" size={25} />
            <input
              onChange={(e) => {
                setCoverImg(e.target.files[0]);
                handleInput(e, 'cover');
              }}
              ref={coverPicInputRef}
              type="file"
              className="hidden"
            />
          </div>
        )}
      </div>
      <div>
        <div
          className={`flex justify-end ${
            isCurrentUser ? 'visible' : 'invisible'
          }`}
        >
          <HiPencil
            onClick={() => setShowEditUserModal(true)}
            className="cursor-pointer"
            size={30}
          />
        </div>
        <div className="mt-8 flex flex-col items-start gap-1.5">
          <div className="text-xl font-semibold text-primary">{user.name}</div>
          {user.profile.location && (
            <div className="flex items-center gap-1.5">
              {' '}
              <FaLocationDot /> {user.profile.location}
            </div>
          )}
          {user.profile.bio && (
            <div className="flex items-center gap-1.5">
              <FaPhoneAlt /> {user.phone}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
