/* eslint-disable react-hooks/rules-of-hooks */
import Header from '../../components/header';
import EducationalInfo from '../../components/EducationalInfo';
import UserDataSection from '../../components/UserDataSection';
import About from '../../components/About';
import SkillsLanguagesSection from '../../components/SkillsLanguagesSection';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import EditHobbiesModal from './components/EditHobbiesModal';

// MODALS
import EducationalModal from './components/EducationalModal';
import EditUserModal from './components/EditUserModal';
import LanguagesModal from './components/LanguagesModal';
import SkillsModal from './components/SkillsModal';
import { getRequest } from '../../utils/requests';

const index = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { name } = user.data;

  const [showEducationalInfoModal, setShowEducationalInfoModal] =
    useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  let { skills, languages, bio, university, hobbies } = user.data.profile;
  let University;
  let Major;
  if (university.highLevel) {
    University = university.university;
    Major = university.major;
  }
  
  const [Skills, setSkills] = useState(skills);
  const [Languages, setLanguages] = useState(languages);
  const [Hobbies, setHobbies] = useState(hobbies);



  const removeSkillAt = (index) => {
    const newSkills = Skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

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
                isCurrentUser={user?.data.name === name}
                user={user.data}
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
              currentUser={user?.data.name === name}
              emptyHeadline="Your skills will shine here."
            />
            <SkillsLanguagesSection
              setShowModal={setShowLanguagesModal}
              text="Languages"
              data={Languages}
              handleRemoveSkill={handleRemoveSkill}
              maxDataToShow={10}
              currentUser={user?.data.name === name}
              emptyHeadline="Your multilingual talengts await."
            />
            <SkillsLanguagesSection
              setShowModal={setShowHobbiesModal}
              text="Hobbies"
              data={Hobbies}
              handleRemoveSkill={handleRemoveSkill}
              maxDataToShow={10}
              currentUser={user?.data.name === name}
              emptyHeadline="Looks like hobbies are still on vacation here."
            />{' '}
          </div>
          <div className="lg:flex-[3] xl:flex-[4.5] flex flex-col gap-6">
            <EducationalInfo
              currentUser={user?.data.name === name}
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
