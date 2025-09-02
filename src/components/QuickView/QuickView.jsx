import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import ProductZoomV2 from '../ProductZoom/ProductZoomV2';
import ProductDetailsContent from '../ProductDetailsContent/ProductDetailsContent';
import { IoCloseSharp } from 'react-icons/io5';

const QuickView = () => {
     const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
      const [maxWidth, setMaxWidth] = useState('md');
      const [fullWidth, setFullWidth] = useState(true);
      const handleCloseModal = () => {
    setOpenProductDetailsModal(false);
  };

    return (
        <div>
             <Dialog
        open={openProductDetailsModal}
        onClose={handleCloseModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
      >

        <DialogContent>
          <div className="flex items-center gap-2 w-full productDetailsModal Container relative">
            <Button onClick={handleCloseModal} title='Close' className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute -top-4 -right-4'><IoCloseSharp className='text-[20px]' /></Button>
            <div className="clo1 md:w-[40%]">
              <ProductZoomV2/>
            </div>
            <div className="rightDiv md:w-[70%] px-4">
              <ProductDetailsContent />
            </div>
          </div>
        </DialogContent>

      </Dialog>

        </div>
    );
};

export default QuickView;