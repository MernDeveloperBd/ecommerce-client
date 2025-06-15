import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const BlogItem = ({image1, image2}) => {
    return (
        <div className='blogItem group py-5'>
            <div className='imageWraper w-full overflow-hidden rounded-md h-[200px] cursor-pointer relative'>
                <img src={image1} alt="" className="w-full transition-all group-hover:scale-105 group-hover:rotate-1" />
                <span className="flex items-center justify-center gap-x-1 text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 bg-opacity-60 text-[12px] font-[600]"><IoMdTime className="text-[16px]" /> 11 June 2025</span>
            </div>
            {/* info */}
            <div className="py-2">
                <p className="text-[16px] font-[600] text-black">Unllam ullamcorper panjabi print</p>
                <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.7)] mb-2">Lorem ipsum dolor sit amet consec tetur adipisicing elit. Modi nobis consequatur officia saepe ....</p>
                <Link className="link text-[13px] font-[500] flex items-center gap-1">Read More <FaArrowRight /></Link>
            </div>
        </div>
    );
};

export default BlogItem;