import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialIcons = () => {
    return (
        <div className="bg-gray-200 py-2">
            <div className="container flex items-center justify-between">
            <div>
                <p>All right reserved by <Link className="link">Haramain Khushbo</Link></p>
            </div>
            <div className=" flex items-center gap-2 mt-2 ">
                <p>Designed by <Link className="link">Md Morad Hossain</Link></p>
                <Link className="text-sky-800 hover:text-sky-600 transition-all duration-500 text-[24px]"><FaFacebook /></Link>
                <Link className="text-red-800 hover:text-red-600 transition-all duration-500 text-[24px]"><FaInstagramSquare /></Link>
            </div>

        </div>
        </div>
    );
};

export default SocialIcons;