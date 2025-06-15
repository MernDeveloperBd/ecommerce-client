
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SizeCollaspe = () => {
    return (
        <div className=''>
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Small" className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1}}/>} label="Medium"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Large"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="XL"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="XXL"  className='w-full' />
           
        </div>
    );
};

export default SizeCollaspe;