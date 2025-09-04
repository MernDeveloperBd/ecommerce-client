import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../../App';
import { fetchDataFromApi, postData } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import SocialLogin from '../../SocialLogin/SocialLogin';

const Login = () => {
  const { openAlertBox, isLogin, setIsLogin, setUserData, getCartItems } = useContext(MyContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogin) {
      navigate("/"); // ✅ already logged in → home এ পাঠিয়ে দাও
    }
  }, [isLogin, navigate]);

  const forgotPassword = () => {
    if (formFields.email === "") {
      openAlertBox('error', "Please enter your email first")
      return false;
    }
    else {
      openAlertBox('success', `OTP Send to ${formFields.email}`)
      localStorage.setItem("userEmail", formFields.email)
      localStorage.setItem("actionType", 'forgot-password')
      //
      postData("/api/user/forgot-password", {
        email: formFields.email,

      }).then((res) => {
        if (res?.error === false) {
          openAlertBox("success", res?.message)
          navigate('/verify')
        }
        else {
          openAlertBox("error", res?.message)
        }
      })
    }
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  const validValue = Object.values(formFields).every(e1 => e1)

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const { email, password } = formFields;
  if (!email) { openAlertBox('error', "Please enter your email"); setIsLoading(false); return; }
  if (!password) { openAlertBox('error', "Please enter your password"); setIsLoading(false); return; }

  try {
    const res = await postData("/api/user/login", { email, password }, { withCredentials: true });

    // robust success check
    const ok =
      res?.error === false ||
      res?.success === true ||
      res?.status === "success" ||
      res?.code === 200;

    const accessToken = res?.data?.accessToken;
    const refreshToken = res?.data?.refreshToken;

    // must have tokens
    if (!ok || !accessToken || !refreshToken) {
      openAlertBox("error", res?.message || "Invalid email or password");
      setIsLoading(false);
      return;
    }

    // persist
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.removeItem("actionType");

    // immediate UI update
    setIsLogin(true);

    // set user in context
    if (res?.data?.user) {
      setUserData(res.data.user);
    } else {
      try {
        const me = await fetchDataFromApi(`/api/user/user-details`);
        if (me?.error === false) setUserData(me?.data);
      } catch {}
    }

    await getCartItems?.();

    openAlertBox("success", res?.message || "Logged in successfully");
    setFormFields({ email: "", password: "" });
    setIsLoading(false);
    navigate("/");
  } catch (err) {
    openAlertBox("error", err?.response?.data?.message || err?.message || "Login failed");
    setIsLoading(false);
  }
};

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* soft background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-200/30 blur-3xl" />
      </div>

      <div className="container py-10">
        <div className="mx-auto max-w-md">
          {/* gradient border card */}
          <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-violet-300 via-fuchsia-300 to-rose-300 shadow-[0_10px_30px_rgba(76,29,149,0.10)]">
            <div className="rounded-2xl bg-white/90 backdrop-blur-sm ring-1 ring-black/5 p-6 md:p-7">

              {/* Logo + title */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                    Login to your account
                  </span>
                </h3>
                <p className="mt-1 text-[12px] md:text-sm text-slate-500">
                  Welcome back! Please enter your details.
                </p>
              </div>

              {/* Form */}
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-group">
                  <TextField
                    type="email"
                    id="email"
                    label="Email *"
                    variant="outlined"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={isLoading === true}
                    onChange={onChangeInput}
                  />
                </div>

                {/* Password */}
                <div className="form-group relative">
                  <TextField
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formFields.password}
                    disabled={isLoading === true}
                    label="Password *"
                    variant="outlined"
                    className="w-full"
                    onChange={onChangeInput}
                  />
                  <Button
                    type="button"
                    aria-label="Toggle password visibility"
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    className="!text-black !text-[20px] !absolute top-[10px] right-[10px] !w-[36px] !h-[36px] !min-w-[36px] !rounded-full hover:!bg-gray-100"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>

                {/* Helper links */}
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="hidden sm:inline">New here?</span>
                    <Link to="/register" className="font-semibold text-violet-700 hover:underline">
                      Create account
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={forgotPassword}
                    className="link font-medium text-violet-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={!validValue}
                    className={`${!validValue
                      ? "!bg-gray-300 !text-gray-600 cursor-not-allowed"
                      : "!bg-gradient-to-r !from-violet-600 !to-fuchsia-600 hover:!opacity-95 !text-white"
                      } !w-full !h-11 !rounded-xl !font-semibold shadow-sm`}
                  >
                    {isLoading === true ? (
                      <CircularProgress className="reg_loading" color="inherit" size={22} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="flex items-center justify-center gap-3 text-[12px] text-slate-400">
                    <span className="h-px w-full bg-slate-200" />
                    <span>or</span>
                    <span className="h-px w-full bg-slate-200" />
                  </div>
                </div>

                {/* Social */}
                <SocialLogin />

                {/* Terms */}
                <p className="text-[11px] text-center text-slate-400 pt-1">
                  By continuing, you agree to our{" "}
                  <Link to="/terms" className="text-violet-700 hover:underline">Terms</Link> and{" "}
                  <Link to="/privacy" className="text-violet-700 hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;