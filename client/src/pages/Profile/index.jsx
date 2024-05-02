/* eslint-disable react-hooks/rules-of-hooks */
import Header from '../../components/header';
import EducationalInfo from '../../components/EducationalInfo';
import UserDataSection from '../../components/UserDataSection';
import About from '../../components/About';
import SkillsLanguagesSection from '../../components/SkillsLanguagesSection';
import { useEffect, useState } from 'react';
import EditHobbiesModal from './components/EditHobbiesModal';

// MODALS
import EducationalModal from './components/EducationalModal';
import EditUserModal from './components/EditUserModal';
import LanguagesModal from './components/LanguagesModal';
import SkillsModal from './components/SkillsModal';
// import { useParams } from 'react-router-dom';
import { getRequest } from '../../utils/requests';

const index = () => {
  var dispatch;
  var user = { profile: {} };
  const { username } = 'Raed';

  const [showEducationalInfoModal, setShowEducationalInfoModal] =
    useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

    let { skills, languages, bio, university, major, hobbies } = user.profile;
    const University = "LIU";
    const Major = "Computer Science";
  const skillsArray = ['Java', 'C#', 'Python', 'PHP', 'JavaScript'];
  const languagesArray = ['English', 'Arabic', 'French'];
  const hobbiesArray = ['Reading', 'Chess', 'Writing'];
  const [Skills, setSkills] = useState(skillsArray);
  const [Languages, setLanguages] = useState(languagesArray);
  const [Hobbies, setHobbies] = useState(hobbiesArray);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRequest(`/user/${user.username}`);
      dispatch({
        type: 'SET_JOINED_COMMUNITIES',
        payload: response.user.joinedCommunities,
      });
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username]);

  const removeSkillAt = (index) => {
    // Create a new array excluding the item at the specified index
    const newSkills = Skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  // Example use in a component
  const handleRemoveSkill = (index) => {
    removeSkillAt(index);
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header profile={true} />
      {/* #000221 */}
      <div className="bg-gray-100 py-6 h-full flex-1 dark:bg-grayMedium">
        <div className="w-full max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-4">
          <div className="lg:flex-[4] xl:flex-[8] flex flex-col gap-6">
            {user && (
              <UserDataSection
                isCurrentUser={user?.usrname === username}
                user={user}
                setShowEditUserModal={setShowEditUserModal}
              />
            )}
            {bio && <About data={bio} />}
            <SkillsLanguagesSection
              setShowModal={setShowSkillsModal}
              text="Skills"
              data={Skills}
              handleRemoveSkill={handleRemoveSkill}
              maxDataToShow={10}
              currentUser={user?.usrname === username}
              emptyHeadline="Your skills will shine here."
            />
            <SkillsLanguagesSection
              setShowModal={setShowLanguagesModal}
              text="Languages"
              data={Languages}
              handleRemoveSkill={handleRemoveSkill}
              maxDataToShow={10}
              currentUser={user?.usrname === username}
              emptyHeadline="Your multilingual talengts await."
            />
            <SkillsLanguagesSection
              setShowModal={setShowHobbiesModal}
              text="Hobbies"
              data={Hobbies}
              handleRemoveSkill={handleRemoveSkill}
              maxDataToShow={10}
              currentUser={user?.usrname === username}
              emptyHeadline="Looks like hobbies are still on vacation here."
            />{' '}
          </div>
          <div className="lg:flex-[3] xl:flex-[4.5] flex flex-col gap-6">
            <EducationalInfo
              currentUser={user?.usrname === username}
              university={University}
              major={Major}
              setShowEducationalInfoModal={setShowEducationalInfoModal}
              emptyHeadline="Share your university and major to showcase your academic background."
            />
          </div>
        </div>
      </div>
      {showEducationalInfoModal && (
        <EducationalModal
          setShowEducationalInfoModal={setShowEducationalInfoModal}
        />
      )}
      {showEditUserModal && (
        <EditUserModal setShowEditUserModal={setShowEditUserModal} />
      )}
      {showLanguagesModal && (
        <LanguagesModal
          languages={languages}
          setShowLanguagesModal={setShowLanguagesModal}
        />
      )}
      {showHobbiesModal && (
        <EditHobbiesModal
          hobbies={hobbies}
          setShowHobbiesModal={setShowHobbiesModal}
        />
      )}
      {showSkillsModal && (
        <SkillsModal skills={skills} setShowSkillsModal={setShowSkillsModal} />
      )}
    </div>
  );
};

export default index;
