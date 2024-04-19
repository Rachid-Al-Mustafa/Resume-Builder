/* eslint-disable react-hooks/rules-of-hooks */
import Header from "../../components/header"
import EducationalInfo from '../../components/EducationalInfo';
import UserDataSection from '../../components/UserDataSection';
import About from '../../components/About';
import SkillsLanguagesSection from "../../components/SkillsLanguagesSection"
import {useEffect, useState} from "react"
import ShowCommunities from "../../components/ShowCommunites"
import ShowFriends from "../../components/ShowFriends"
import EditHobbiesModal from "./components/EditHobbiesModal"

// MODALS
import EducationalModal from './components/EducationalModal'
import EditUserModal from './components/EditUserModal'
import LanguagesModal from "./components/LanguagesModal"
import SkillsModal from "./components/SkillsModal"
import {useParams} from "react-router-dom"
import {getRequest} from "../../utils/requests"

const index = () => {

    var dispatch;
    var user = {profile:{}}
    const {username} = useParams()

    const [showEducationalInfoModal,
        setShowEducationalInfoModal] = useState(false);
    const [showEditUserModal,
        setShowEditUserModal] = useState(false)
    const [showLanguagesModal,
        setShowLanguagesModal] = useState(false)
    const [showHobbiesModal,
        setShowHobbiesModal] = useState(false)
    const [showSkillsModal,
        setShowSkillsModal] = useState(false);
    const [joinedCommunities,
        setJoinedCommunities] = useState([])
    const [friends,
        setFriends] = useState([])

    let {createdCommunities} = user
    let {
        skills,
        languages,
        bio,
        university,
        major,
        hobbies
    } = user.profile

    useEffect(() => {
        const getUser = async() => {
            const response = await getRequest(`/user/${user.username}`);
            response && setJoinedCommunities(response.user.joinedCommunities);
            response && setFriends(response.user.friends)
            dispatch({type: "SET_JOINED_COMMUNITIES", payload: response.user.joinedCommunities})
        };
        getUser();
    }, [user.username]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header profile={true}/>
            {/* #000221 */}
            <div className="bg-gray-100 py-6 h-full flex-1 dark:bg-grayMedium">
                <div
                    className="w-full max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-4">
                    <div className="lg:flex-[4] xl:flex-[8] flex flex-col gap-6">
                        {user && (<UserDataSection
                            friends={friends}
                            isCurrentUser={user
                            ?.usrname === username}
                            user={user}
                            setShowEditUserModal={setShowEditUserModal}/>)}
                        {bio && <About data={bio}/>}
                        <SkillsLanguagesSection
                            setShowModal={setShowSkillsModal}
                            text="Skills"
                            data={skills}
                            maxDataToShow={10}
                            currentUser={user
                            ?.usrname === username}
                            emptyHeadline="Your skills will shine here."/>
                        <SkillsLanguagesSection
                            setShowModal={setShowLanguagesModal}
                            text="Languages"
                            data={languages}
                            maxDataToShow={10}
                            currentUser={user
                            ?.usrname === username}
                            emptyHeadline="Your multilingual talengts await."/>
                        <SkillsLanguagesSection
                            setShowModal={setShowHobbiesModal}
                            text="Hobbies"
                            data={hobbies}
                            maxDataToShow={10}
                            currentUser={user
                            ?.usrname === username}
                            emptyHeadline="Looks like hobbies are still on vacation here."/>{" "} {createdCommunities
                            ?.length > 0 && (<ShowCommunities
                                withoutUsername={true}
                                text={"Created communities"}
                                maxDataToShow={4}
                                data={createdCommunities}/>)}
                        {joinedCommunities
                            ?.length > 0 && (<ShowCommunities
                                text={"Joined communities"}
                                maxDataToShow={4}
                                data={joinedCommunities}/>)}
                    </div>
                    <div className="lg:flex-[3] xl:flex-[4.5] flex flex-col gap-6">
                        <EducationalInfo
                            currentUser={user
                            ?.usrname === username}
                            university={university}
                            major={major}
                            setShowEducationalInfoModal={setShowEducationalInfoModal}
                            emptyHeadline="Share your university and major to showcase your academic background."/>
                    </div>
                </div>
            </div>
            {showEducationalInfoModal && (<EducationalModal setShowEducationalInfoModal={setShowEducationalInfoModal}/>)}
            {showEditUserModal && (<EditUserModal setShowEditUserModal={setShowEditUserModal}/>)}
            {showLanguagesModal && (<LanguagesModal
                languages={languages}
                setShowLanguagesModal={setShowLanguagesModal}/>)}
            {showHobbiesModal && (<EditHobbiesModal hobbies={hobbies} setShowHobbiesModal={setShowHobbiesModal}/>)}
            {showSkillsModal && (<SkillsModal skills={skills} setShowSkillsModal={setShowSkillsModal}/>)}
        </div>
    );
}

export default index