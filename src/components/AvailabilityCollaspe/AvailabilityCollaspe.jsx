
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AvailabilityCollaspe = () => {
    return (
        <div className=''>
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Available" className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1}}/>} label="In Stock"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Not Available"  className='w-full' />
         
        </div>
    );
};

export default AvailabilityCollaspe;