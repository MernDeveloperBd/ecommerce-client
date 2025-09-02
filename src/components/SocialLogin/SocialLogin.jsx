import { Button } from '@mui/material';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { FcGoogle } from 'react-icons/fc';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const { googleLogIn, openAlertBox, setIsLoading , setIsLogin} = useContext(MyContext)
  const navigate = useNavigate()
  // sign in with google
  const handleGoogleLogIn = () => {
    googleLogIn().then((result) => {
      console.log(result);
      const user = result.user;
      const fields = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        password: null,
        avatar: user.providerData[0].photoURL,
        mobile: user.providerData[0].phoneNumber,
        role: "USER"
      };
      postData("/api/user/authWithGoogle", fields)
        .then((res) => {
          if (res?.error !== true) {
            openAlertBox("success", res?.message)
            localStorage.setItem("userEmail", fields.email)
            localStorage.setItem("accessToken", res?.data?.accessToken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);
            setIsLogin(true)
            navigate('/')

          } else {
            openAlertBox("error", res?.message)
            setIsLoading(false)
          }

        })
    }).catch((error) => {
      console.log(error);

    })
  };

  return (
    <div>
      <div className="relative group rounded-xl p-[1.5px] bg-gradient-to-r from-[#4285F4]/30 via-[#34A853]/30 to-[#EA4335]/30 shadow-[0_6px_20px_rgba(66,133,244,0.15)]">
        <Button
          onClick={handleGoogleLogIn}
          type="button"
          aria-label="Continue with Google"
          className="group relative overflow-hidden !w-full !h-11 !rounded-[12px]
               !bg-white !text-slate-800 !font-semibold
               ring-1 ring-gray-200 hover:ring-[#4285F4]/30
               shadow-sm hover:!bg-white focus-visible:ring-2 focus-visible:ring-[#4285F4]/40 transition"
        >
          {/* Shine sweep on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-black/5 
                 translate-x-[-150%] opacity-0 group-hover:translate-x-[300%] group-hover:opacity-100 
                 transition-all duration-700 ease-out"
          />

          <span className="relative z-[1] flex items-center justify-center gap-3">
            {/* Google icon in pill */}
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
              <FcGoogle className="text-[18px]" />
            </span>
            <span className="text-sm md:text-[15px] tracking-wide">
              Continue with Google
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;