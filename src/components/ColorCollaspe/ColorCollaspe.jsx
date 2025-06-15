
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ColorCollaspe = () => {
    return (
        <div className=''>
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Red" className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1}}/>} label="Green"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Pink"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Brown"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Sky Blue"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="White"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Black"  className='w-full' />
        </div>
    );
};

export default ColorCollaspe;