
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
import { fetchDataFromApi, postData } from './utils/api'
import Address from './components/Pages/MyAccount/Address'
import ProductZoomV2 from './components/ProductZoom/ProductZoomV2'
import ScrollToTop from './components/ScrolTop/ScrollToTop'

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from './firebaseConfig/firebase.config'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();



export const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    product: {}
  });
  const [maxWidth, setMaxWidth] = useState('md');
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([])
  const [catData, setCatData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState([])
  const [myListData, setMyListData] = useState([])
  const [isAddedMyList, setIsAddedMyList] = useState(false);

  // Cart
  const [openCartModal, setOpenCartModal] = useState(false);

  const handleOpenProductdetailModel = (status, product) => {
    setOpenProductDetailsModal({
      open: status,
      product: product
    })
  }
  const handleCloseProductdetailModel = () => {
    setOpenProductDetailsModal({
      open: false,
      product: {}
    })
  }

  const toggleCartModal = (newOpen) => () => {
    setOpenCartModal(newOpen);
  };

  const handleCloseModal = () => {
    setOpenProductDetailsModal(false);
  };


  // google sign in
  const googleLogIn = () => {
    return signInWithPopup(auth, googleProvider)
  }

   
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(Boolean(token));
  }, []);
  
// Add To Cart (আগের মতোই রাখতে পারেন)
const addToCart = (product, userId, quantity = 1) => {
  if (!userId) {
    openAlertBox("error", "You are not logged in. please login first");
    return;
  }
  const data = {
    productTitle: product?.name,
    image: product?.image || product?.images?.[0] || "",
    rating: product?.rating,
    price: product?.price,
    quantity,
    subTotal: parseInt(product?.price * quantity),
    productId: product?._id,
    countInStock: product?.countInStock, // server ideally should validate
    userId,
    brand: product?.brand,
    productSize: product?.productSize,
    productColor: product?.productColor,
    oldPrice: product?.oldPrice
  };

  postData('/api/cart/add', data).then((res) => {
    if (res?.error === false) {
      openAlertBox("success", res?.message);
      getCartItems();
    } else {
      openAlertBox('error', res?.message);
    }
  });
};

// 2) fetchers (ফিক্স)
const getCartItems = () => {
  fetchDataFromApi('/api/cart/getItems').then((res) => {
    if (res?.error === false) {
      setCartData(res?.data);
    }
  });
};

const getmyListData = () => {
  fetchDataFromApi('/api/myList').then((res) => {
    if (res?.error === false) {
      setMyListData(res?.data);
    }
  });
};

// 3) login হলে cart + myList ফেচ করুন
useEffect(() => {
  if (!isLogin) return;

  fetchDataFromApi(`/api/user/user-details`).then((res) => {
    if (res?.error === false) {
      setUserData(res?.data);
    } else if (res?.response?.data?.error === true) {
      if (res?.response?.data?.message === "You have got login") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        openAlertBox("error", "Your session is closed. please login again");
        setIsLogin(false);
        window.location.href = "/login";
      }
    }
  });

  getCartItems();
  getmyListData(); // <-- add this
}, [isLogin]);




  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
    });
    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      if (res?.error === false) {
        setProductsData(res?.data);
      }
    });

  }, []);

  // alert box
  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg)
    }
    if (status === "error") {
      toast.error(msg)
    }
  };

 
 

  // Handle add to my list
  const handleAddToMyList = (product) => {   
    if (userData === null) {
      openAlertBox("error", "You are not logged in. please login first")
      return false;
    } else {
      const obj = {
        productId: product?._id,
        userId: userData?._id,
        productTitle: product?.name,
        image: product?.images[0],
        rating: product?.rating,
        price: product?.price,
        oldPrice: product?.oldPrice,
        resellingPrice: product?.resellingPrice,
        brand: product?.brand,
        catName: product?.catName,

      }
      postData('/api/myList/add', obj).then((res) => {
        if (res?.error === false) {
          openAlertBox("success", res?.message)
          getmyListData()
          setIsAddedMyList(true)
        } else {
          openAlertBox('error', res?.message)
        }

      })
    }
  }



  const values = { setOpenProductDetailsModal, openCartModal, toggleCartModal, setOpenCartModal, openAlertBox, isLogin, setIsLogin, userData, setUserData, addToCart, address, setAddress, catData, setCatData, productsData, setProductsData, handleOpenProductdetailModel, googleLogIn, isLoading, setIsLoading, cartData, setCartData, getCartItems, handleAddToMyList, myListData, getmyListData, setIsAddedMyList,setMyListData , isAddedMyList }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
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
              <Route path={'/address'} exact={true} element={<Address />} />

            </Routes>
          </div>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />

      {/* modal */}
      <Dialog
        open={openProductDetailsModal.open}
        onClose={handleCloseProductdetailModel}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
      >

        <DialogContent>
          <div className="flex items-center gap-2 w-full productDetailsModalContainer relative">
            <Button onClick={handleCloseProductdetailModel} title='Close' className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute -top-4 -right-4'><IoCloseSharp className='text-[20px]' /></Button>
            {
              openProductDetailsModal?.product?.length !== 0 && <>
                <div className="clo1 md:w-[40%] hidden md:block">
                  <ProductZoomV2 images={openProductDetailsModal?.product} />
                </div>
                <div className="rightDiv md:w-[70%] px-4">
                  <ProductDetailsContent data={openProductDetailsModal?.product} />
                </div>
              </>
            }

          </div>
        </DialogContent>

      </Dialog>


    </>
  )
}

export default App
