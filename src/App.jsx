
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
import { createContext, useEffect, useState } from 'react'
import ProductZoom from './components/ProductZoom/ProductZoom'
import ProductDetailsContent from './components/ProductDetailsContent/ProductDetailsContent'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import Cart from './components/Cart/Cart'

import toast, { Toaster } from 'react-hot-toast';
import Verify from './components/Pages/Login/Verify'
import ForgotPassword from './components/Pages/ForgotPassword/ForgotPassword'
import Checkout from './components/Checkout/Checkout'
import MyAccount from './components/Pages/MyAccount/MyAccount'
import MyList from './components/MyList/MyLIst'
import Orders from './components/Pages/Orders/Orders'
import { fetchDataFromApi } from './utils/api'


export const MyContext = createContext()
function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [maxWidth, setMaxWidth] = useState('md');
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);


  // Cart
  const [openCartModal, setOpenCartModal] = useState(false);

  const toggleCartModal = (newOpen) => () => {
    setOpenCartModal(newOpen);
  };

  const handleCloseModal = () => {
    setOpenProductDetailsModal(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true)
      
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res?.data)
         if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message == 'You have got login') {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            openAlertBox("error", "Your session is closed. please login again")
            window.location.href='/login'
            setIsLogin(false)
          }
        } 
      })
    } else {
      setIsLogin(false)
    }
  }, [setIsLogin])

  // alert box
  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg)
    }
    if (status === "error") {
      toast.error(msg)
    }
  }

  const values = { setOpenProductDetailsModal, openCartModal, toggleCartModal, setOpenCartModal, openAlertBox, isLogin, setIsLogin, userData, setUserData }

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
              <Route path={'/cart'} exact={true} element={<Cart />} />
              <Route path={'/verify'} exact={true} element={<Verify />} />
              <Route path={'/forgot-Password'} exact={true} element={<ForgotPassword />} />
              <Route path={'/checkout'} exact={true} element={<Checkout />} />
              <Route path={'/my-account'} exact={true} element={<MyAccount />} />
              <Route path={'/my-list'} exact={true} element={<MyList />} />
              <Route path={'/my-orders'} exact={true} element={<Orders />} />

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
