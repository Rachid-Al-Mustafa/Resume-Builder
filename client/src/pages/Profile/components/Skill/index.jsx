import {GrClose} from "react-icons/gr";

const index = ({skill, remove}) => {
    return (
        <div className="relative cursor-pointer flex items-center gap-2 py-2 px-4 rounded-md border-2">
            {skill}
            {remove && <div
                className="absolute -top-[12px] -right-[12px] bg-gray-200 p-1.5 rounded-full font-medium cursor-pointer dark:bg-white">
                <GrClose className="font-medium" size={15}/>
            </div>}
        </div>
    );
};

export default index;
