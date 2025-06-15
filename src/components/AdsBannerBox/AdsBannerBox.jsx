import { Link } from "react-router-dom";


const AdsBannerBox = (props) => {
    return (
        <div className='box bannerBox rounded-lg overflow-hidden transition-all group'>
            <Link to='/'>
            <img src={props?.img} alt="banner box image" className='w-full h-[220px] group-hover:scale-105 duration-500 ' />
            </Link>
        </div>
    );
};

export default AdsBannerBox;