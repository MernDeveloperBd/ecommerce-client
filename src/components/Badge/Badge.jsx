

const Badge = (props) => {
    return (
        <div>
            <span className={`inline-block py-1 px-3 text-[12px] rounded-full ${props.status === 'Pending' && 'bg-orange-600 text-white'} ${props.status === 'Confirm' && 'bg-green-500 text-white'} ${props.status === 'Delivered' && 'bg-green-700 text-white'}`}>{props?.status}</span>
        </div>
    );
};

export default Badge;