import { Link } from "react-router-dom";


const AdsBannerBoxV2 = (props) => {
    return (
        <div className='box bannerBox rounded-lg overflow-hidden transition-all group'>
            <Link to={`/${props?.link}`}>
            <img src={props?.img} alt="banner box image" className='w-full h-[220px] group-hover:scale-105 duration-500 relative object-cover' />
             <div className="flex h-[50%] items-center  p-2 group absolute top-[30%] left-[10%]">
                <div className="space-y-2">
                    <h4 className='text-[14px] md:text-[18px] font-semibold'>{props?.heading}</h4>
                    <h2 className=' text-[14px]'>{props?.title}</h2>
                    <h3>TK 1500</h3>
                </div>                
            </div>
            </Link>
            
        </div>
    );
};

export default AdsBannerBoxV2;