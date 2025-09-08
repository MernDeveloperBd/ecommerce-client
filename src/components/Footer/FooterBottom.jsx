import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IoIosArrowDown } from "react-icons/io";

const FooterBottom = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="footer py-6 rounded-3xl bg-gradient-to-b from-white to-gray-50 shadow-[0_1px_10px_rgba(2,6,23,0.04)]">
  <div className="md:grid md:grid-cols-4 md:gap-6">
    {/* Contact Section */}
    <div className="col-span-1 mb-4 md:mb-0">
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition">
        <button
          type="button"
          onClick={() => toggleSection('contact')}
          aria-expanded={openSection === 'contact'}
          className="w-full flex justify-between items-center md:cursor-default"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Contact us</h2>
          <span className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm transition-transform">
            <IoIosArrowDown className={`${openSection === 'contact' ? 'rotate-180' : ''} transition-transform duration-300`} />
          </span>
        </button>

        {(openSection === 'contact' || window.innerWidth >= 768) && (
          <div className="md:block mt-3">
            <h2 className="text-sm md:!text-xl font-semibold text-slate-800">
              MM Fashion <span className="text-sky-600">World</span>
            </h2>
            <p className="text-gray-600 mt-1 text-sm mb-1">Mohammadpur, Dhaka</p>
            <Link className="link block mb-3 text-sky-700 hover:text-sky-600 transition-colors text-sm" to="mailto:marifamisam@gmail.com">
              marifamisam@gmail.com
            </Link>

            <div className="flex items-center gap-2 mb-3">
              <Link to="https://wa.me/8801749889595" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 shadow-sm hover:bg-emerald-100 transition">
                <FaSquareWhatsapp className="text-lg" />
              </Link>
              <Link to="https://wa.me/8801749889595" className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition">
                +880-1749-889595
              </Link>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600 ring-1 ring-rose-200">
                <IoChatboxOutline className="text-xl" />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </span>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-slate-900">Online Chat</h4>
                <h4 className="text-sm md:text-base font-medium text-slate-600">Get Expert Help</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Products & Shop Links */}
    <div className="col-span-2 mb-4 md:mb-0">
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          {/* Products */}
          <div className="pb-4 md:pb-0 md:border-r md:pr-6 border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('products')}
              aria-expanded={openSection === 'products'}
              className="w-full flex justify-between items-center md:cursor-default"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">Products</h2>
              <span className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm">
                <IoIosArrowDown className={`${openSection === 'products' ? 'rotate-180' : ''} transition-transform duration-300`} />
              </span>
            </button>

            {(openSection === 'products' || window.innerWidth >= 768) && (
              <ul className="space-y-1.5 text-sm">
                <li >
                    <Link to="/productListing?cat=68b17b95fd76640af810b03b" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Women Fashion
                    </Link>
                  </li>
                <li >
                    <Link to="/productListing?cat=68ada6938248689e15621edb" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Men Fashion
                    </Link>
                  </li>
                <li >
                    <Link to="/productListing?cat=68b17b95fd76640af810b03b" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Baby Fashion
                    </Link>
                  </li>
                <li >
                    <Link to="/productListing?cat=68b1ae38b0db8d166b399fd8" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Jewellery
                    </Link>
                  </li>
                <li >
                    <Link to="/productListing?cat=68b2ccedd63fa25a79b2b594" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Home Decore
                    </Link>
                  </li>
                <li >
                    <Link to="/productListing?cat=68b2ccedd63fa25a79b2b594" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Combo
                    </Link>
                  </li>
              </ul>
            )}
          </div>

          {/* Shop */}
          <div className="pt-4 md:pt-0 pl-0 md:pl-6">
            <button
              type="button"
              onClick={() => toggleSection('shop')}
              aria-expanded={openSection === 'shop'}
              className="w-full flex justify-between items-center md:cursor-default"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">Our Shop</h2>
              <span className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm">
                <IoIosArrowDown className={`${openSection === 'shop' ? 'rotate-180' : ''} transition-transform duration-300`} />
              </span>
            </button>

            {(openSection === 'shop' || window.innerWidth >= 768) && (
              <ul className="space-y-1.5 text-sm">
               
                  <li >
                    <Link to="/about" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      About Us
                    </Link>
                  </li>
                  <li >
                    <Link to="/t&c" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Terms & Conditons
                    </Link>
                  </li>
                  <li >
                    <Link to="#" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Site maps
                    </Link>
                  </li>
                  <li >
                    <Link to="#" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      FAQ
                    </Link>
                  </li>
                  <li >
                    <Link to="/contactUs" className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition"></span>
                      Contact Us
                    </Link>
                  </li>
                
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Newsletter */}
    <div className="col-span-1">
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition">
        <button
          type="button"
          onClick={() => toggleSection('newsletter')}
          aria-expanded={openSection === 'newsletter'}
          className="w-full flex justify-between items-center md:cursor-default"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Subscribe to Newsletter</h2>
          <span className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm">
            <IoIosArrowDown className={`${openSection === 'newsletter' ? 'rotate-180' : ''} transition-transform duration-300`} />
          </span>
        </button>

        {(openSection === 'newsletter' || window.innerWidth >= 768) && (
          <div className="mt-3">
            <p className="text-sm md:text-base text-slate-600 mb-3">
              Subscribe to our latest newsletter to get news about special discounts
            </p>

            {/* Combined input + button */}
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  className="w-full h-11 rounded-full border border-gray-200 bg-white px-4 pr-28 text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition"
                  placeholder="Your email"
                />
                <Button
                  variant="contained"
                  className="!absolute !right-1.5 !top-1.5 !h-8 !rounded-full !px-4 !text-white !bg-sky-500 hover:!bg-sky-600 !normal-case !text-xs md:!text-sm shadow-sm"
                >
                  Subscribe
                </Button>
              </div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className="text-xs md:text-sm text-slate-600">I agree to the terms and conditions</span>}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default FooterBottom;
