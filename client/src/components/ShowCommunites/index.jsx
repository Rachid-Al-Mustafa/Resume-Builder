/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from "react";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import SearchedCommunity from "../../components/SearchedCommunity"
import Button from "./UI/Button";

const index = ({text, data, maxDataToShow, withoutUsername}) => {

    const [showAllData,
        setShowAllData] = useState(false)

    return (
        <div
            className="bg-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="text-xl font-semibold flex items-center justify-between text-primary">
                {text}
            </div>
            <div className="flex flex-col gap-4">
                {data
                    .slice(0, showAllData
                    ? data?.length : maxDataToShow)
                    .map((comm, index) => {
                        const {name, privacy, _id} = comm;
                        const {username} = comm.creator;
                        return (
                            <div key={index} className="pb-2 border-b border-b-3 border-b-gray-300">
                                <SearchedCommunity
                                    withoutUsername={withoutUsername}
                                    name={name}
                                    privacy={privacy}
                                    id={_id}
                                    creatorUsername={username}/>
                            </div>
                        );
                    })}
            </div>
            {data
                ?.length > maxDataToShow && (
                    <div>
                        {showAllData
                            ? (
                                <Button text={"Show less"} icon={<BsChevronUp />} setShowAllData={setShowAllData} />
                            )
                            : (
                                <Button text={"Show more"} icon={<BsChevronDown />} setShowAllData={setShowAllData} />
                            )} 
                    </div>
                )}
        </div>
    );
}

export default index