
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Pages/Home'
import Footer from './components/Footer/Footer'
import ProductListing from './components/Pages/ProductListing/ProductListing'
import ProductDetails from './components/Pages/ProductDetails.jsx/ProductDetails'
import { IoCloseSharp } from "react-icons/io5";

// modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { createContext, useState } from 'react'
import ProductZoom from './components/ProductZoom/ProductZoom'
import ProductDetailsContent from './components/ProductDetailsContent/ProductDetailsContent'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import Cart from './components/Cart/Cart'

import toast, { Toaster } from 'react-hot-toast';
import Verify from './components/Pages/Login/Verify'
import ForgotPassword from './components/Pages/ForgotPassword/ForgotPassword'

export const MyContext = createContext()
function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');

  // Cart
  const [openCartModal, setOpenCartModal] = useState(false);

  const toggleCartModal = (newOpen) => () => {
    setOpenCartModal(newOpen);
  };

  const handleCloseModal = () => {
    setOpenProductDetailsModal(false);
  };
  // alert box
  const openAlertBox = (status, msg) =>{
    if(status === "success"){
      toast.success(msg)
    }
    if(status === "error"){
      toast.error(msg)
    }
  }

  const values = { setOpenProductDetailsModal,openCartModal,toggleCartModal, setOpenCartModal, openAlertBox }

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <div className='min-h-screen'>
            <Routes>
              <Route path={'/'} exact={true} element={<Home />} />
              <Route path={'/productListing'} exact={true} element={<ProductListing />} />
              <Route path={'/productDetails/:id'} exact={true} element={<ProductDetails />} />
              <Route path={'/login'} exact={true} element={<Login />} />
              <Route path={'/register'} exact={true} element={<Register />} />
              <Route path={'/cart'} exact={true} element={<Cart/> } />
              <Route path={'/verify'} exact={true} element={<Verify/> } />
              <Route path={'/forgotPassword'} exact={true} element={<ForgotPassword/> } />
            </Routes>
          </div>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />
      {/* modal */}
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
          <div className="flex items-center gap-2 w-full productDetailsModalContainer relative">
            <Button onClick={handleCloseModal} title='Close' className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute -top-4 -right-4'><IoCloseSharp className='text-[20px]' /></Button>
            <div className="clo1 md:w-[40%]">
              <ProductZoom />
            </div>
            <div className="rightDiv md:w-[70%] px-4">
              <ProductDetailsContent />
            </div>
          </div>
        </DialogContent>

      </Dialog>
     

    </>
  )
}

export default App
