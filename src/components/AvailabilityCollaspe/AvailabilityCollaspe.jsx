
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AvailabilityCollaspe = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-1 md-6'>
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Available"  sx={{
                    '& .MuiFormControlLabel-label': {
                        fontSize: '14px', // যেকোনো px বা rem দিতে পারবেন
                    },
                }} />
           <FormControlLabel control={<Checkbox size='small' sx={{ py:0.6,px:1 }}/>} label="Not Available"   sx={{
                    '& .MuiFormControlLabel-label': {
                        fontSize: '14px', // যেকোনো px বা rem দিতে পারবেন
                    },
                }} />
         
        </div>
    );
};

export default AvailabilityCollaspe;