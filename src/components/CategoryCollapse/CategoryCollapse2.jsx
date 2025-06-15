
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CategoryCollapse2 = () => {
    return (
        <div className=''>
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="পোশাক" className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1}}/>} label="ইসলামিক সামগ্রী"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="ঐতিহ্যবাহী পোশাক"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="মশারী"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="বেডিং"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="রুমাল"  className='w-full' />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="মোজা"  className='w-full' />
        </div>
    );
};

export default CategoryCollapse2;