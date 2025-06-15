import { Link } from "react-router-dom";

const OneBanner = () => {
    return (
        <div className="bg-white py-8">
            <div className="container ">
                <Link to={'/'}>
                <img src="https://i.ibb.co/S7MP82GQ/banner-width.png" alt="banner image" className="w-full h-[140px] object-cover rounded-md" />
                </Link>
            </div>
        </div>
    );
};

export default OneBanner;