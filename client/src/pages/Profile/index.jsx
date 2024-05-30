import Header from '../../components/header';
import EducationalInfo from '../../components/EducationalInfo';
import ExperienceInfo from '../../components/ExperienceInfo';
import ResumeInfo from '../../components/ResumeInfo';
import UserDataSection from '../../components/UserDataSection';
import About from '../../components/About';
import SkillsLanguagesSection from '../../components/SkillsLanguagesSection';
import HobbiesSection from '../../components/HobbiesSection';
import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
// MODALS
import EditHobbiesModal from './components/EditHobbiesModal';
import EditRHobbiesModal from './components/EditRHobbiesModal';
import EducationalModal from './components/EducationalModal';
import REducationalModal from './components/REducationalModal';
import ExperienceModal from './components/ExperienceModal';
import RExperienceModal from './components/RExperienceModal';
import ResumeModal from './components/ResumeModal';
import EditUserModal from './components/EditUserModal';
import LanguagesModal from './components/LanguagesModal';
import RLanguagesModal from './components/RLanguagesModal';
import SkillsModal from './components/SkillsModal';
import SSkillsModal from './components/SSkillsModal';

import noPic from '../../assets/noProfile.png';

const index = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { name } = user.data;

  const [showEducationalInfoModal, setShowEducationalInfoModal] = useState(false);
  const [showREducationalInfoModal, setShowREducationalInfoModal] =
    useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showRExperienceModal, setShowRExperienceModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showRHobbiesModal, setShowRHobbiesModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showResumesModal, setShowResumesModal] = useState(false);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showRLanguagesModal, setShowRLanguagesModal] = useState(false);

  const { skills, languages, bio, university, hobbies, experience, resumes } =
    user.data.profile;
  
  const [Skills, setSkills] = useState(skills);
  const [Languages, setLanguages] = useState(languages);
  const [Hobbies, setHobbies] = useState(hobbies);


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
              maxDataToShow={10}
              currentUser={user?.data.name === name}
              emptyHeadline="Your skills will shine here."
            />
            <SkillsLanguagesSection
              setShowModal={setShowLanguagesModal}
              text="Languages"
              data={Languages}
              maxDataToShow={10}
              currentUser={user?.data.name === name}
              emptyHeadline="Your multilingual talengts await."
            />
            <HobbiesSection
              setShowModal={setShowHobbiesModal}
              text="Hobbies"
              data={Hobbies}
              maxDataToShow={10}
              currentUser={user?.data.name === name}
              emptyHeadline="Looks like hobbies are still on vacation here."
            />{' '}
          </div>
          <div className="lg:flex-[3] xl:flex-[4.5] flex flex-col gap-6">
            <EducationalInfo
              currentUser={user?.data.name === name}
              uni={university}
              setShowEducationalInfoModal={setShowEducationalInfoModal}
              emptyHeadline="Share your university and major to showcase your academic background."
            />
            <ExperienceInfo
              currentUser={user?.data.name === name}
              experience={experience}
              setShowExperienceModal={setShowExperienceModal}
              emptyHeadline="Share your experience to showcase your Advantage."
            />
            <ResumeInfo
              currentUser={user?.data.name === name}
              resumes={resumes}
              setShowResumesModal={setShowResumesModal}
              emptyHeadline="Share your Information to showcase your Advantage."
            />
          </div>
        </div>
      </div>
      {showEducationalInfoModal && (
        <EducationalModal
          setShowEducationalInfoModal={setShowEducationalInfoModal}
        />
      )}
      {showREducationalInfoModal && (
        <REducationalModal
          setShowREducationalInfoModal={setShowREducationalInfoModal}
          setShowRExperienceModal={setShowRExperienceModal}
        />
      )}
      {showExperienceModal && (
        <ExperienceModal setShowExperienceModal={setShowExperienceModal} />
      )}
      {showRExperienceModal && (
        <RExperienceModal setShowRExperienceModal={setShowRExperienceModal} />
      )}
      {showResumesModal && (
        <ResumeModal
          setShowResumesModal={setShowResumesModal}
          setShowSecondStep={setShowSecondStep}
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
      {showRLanguagesModal && (
        <RLanguagesModal
          languages={languages}
          setShowRLanguagesModal={setShowRLanguagesModal}
          setShowRHobbiesModal={setShowRHobbiesModal}
        />
      )}
      {showHobbiesModal && (
        <EditHobbiesModal
          hobbies={hobbies}
          setShowHobbiesModal={setShowHobbiesModal}
        />
      )}
      {showRHobbiesModal && (
        <EditRHobbiesModal
          hobbies={hobbies}
          setShowRHobbiesModal={setShowRHobbiesModal}
          setShowREducationalInfoModal={setShowREducationalInfoModal}
        />
      )}
      {showSkillsModal && (
        <SkillsModal skills={skills} setShowSkillsModal={setShowSkillsModal} />
      )}
      {showSecondStep && (
        <SSkillsModal
          skills={skills}
          setShowSecondStep={setShowSecondStep}
          setShowRLanguagesModal={setShowRLanguagesModal}
        />
      )}
    </div>
  );
};

export default index;
