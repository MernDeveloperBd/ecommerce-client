import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import bkash from "../../assets/bkash_logo.png";
import nagad from "../../assets/nagad.png";
import bank from "../../assets/bank.png";

const SocialIcons = () => {
  return (
   <div className="relative overflow-hidden border-t border-gray-200/70 bg-gradient-to-br from-white via-gray-50 to-white">
  {/* Subtle pattern + pastel glows */}
  <div
    className="pointer-events-none absolute inset-0 -z-[1] opacity-60"
    style={{
      backgroundImage:
        'radial-gradient(rgba(2,6,23,0.035) 1px, transparent 1px)',
      backgroundSize: '14px 14px',
    }}
  />
  <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-sky-200/25 blur-3xl -z-[1]" />
  <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-violet-200/25 blur-3xl -z-[1]" />
  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

  <div className="container mx-auto px-4 py-5 md:py-6">
    <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 shadow-[0_1px_10px_rgba(2,6,23,0.04)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        {/* Left - Copyright */}
        <div className="text-center md:text-left">
          <p className="text-[12px] md:text-[14px] text-gray-600">
            © {new Date().getFullYear()} All rights reserved by{' '}
            <Link
              to="/"
              className="relative font-semibold text-gray-900 transition-colors hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40 rounded-sm"
            >
              MM Fashion World
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-300 to-violet-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </p>
        </div>

        {/* Middle - Payment methods */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[11px] md:text-[14px] text-slate-800">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-sky-600"
              aria-hidden="true"
            >
              <path
                d="M7 10V8a5 5 0 1110 0v2M6 10h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Secure payments:
          </span>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 ring-1 ring-gray-200 shadow-sm">
            <span className="inline-flex h-7 w-12 items-center justify-center rounded-md bg-white ring-1 ring-gray-200 shadow-sm transition hover:ring-sky-200">
              <img src={bkash} alt="Bkash" className="h-4 w-auto" />
            </span>
            <span className="inline-flex h-7 w-12 items-center justify-center rounded-md bg-white ring-1 ring-gray-200 shadow-sm transition hover:ring-sky-200">
              <img src={nagad} alt="Nagad" className="h-4 w-auto" />
            </span>
            <span className="inline-flex h-7 w-12 items-center justify-center rounded-md bg-white ring-1 ring-gray-200 shadow-sm transition hover:ring-sky-200">
              <img src={bank} alt="Bank" className="h-4 w-auto" />
            </span>
          </div>
        </div>

        {/* Right - Designed by + Social */}
        <div className="flex items-center gap-2 md:gap-3">
          <p className="text-[12px] md:text-[14px] text-gray-600">
            Designed by{' '}
            <Link
              to="https://www.facebook.com/mmfashionworldonline"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-gray-900 hover:text-sky-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40 rounded-sm"
            >
              Misam Mehzabin
            </Link>
          </p>

          <span className="hidden md:block h-5 w-px bg-gray-300/70" aria-hidden="true" />

          {/* Social buttons (soft) */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-1.5 py-1 ring-1 ring-gray-200 shadow-sm">
            <Link
              to="https://www.facebook.com/mmfashionworldonline"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-gray-200 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40"
            >
              <FaFacebook className="text-[16px]" />
            </Link>
            <Link
              to="#"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-gray-200 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/40"
            >
              <FaInstagramSquare className="text-[16px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default SocialIcons;