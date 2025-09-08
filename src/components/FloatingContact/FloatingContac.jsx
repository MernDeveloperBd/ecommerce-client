
import  { useEffect, useRef, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { FiMessageSquare, FiX } from "react-icons/fi";

const FloatingContact = ({
  whatsappNumber = "8801749889595", 
  messengerLink = "https://m.me/mmfashionworldonline", // তোমার m.me পেজ/ইউজারনেম
  message = "হ্যালো MM Fashion World! আমি অর্ডার করতে চাই।",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center "
      aria-live="polite"
    >
      {/* Expanded buttons (WhatsApp & Messenger) */}
      <div
        className={`flex flex-col items-center gap-2 mb-3 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg hover:bg-green-700 transform hover:scale-105 transition"
          aria-label="WhatsApp"
          tabIndex={open ? 0 : -1}
        >
          <BsWhatsapp className="w-5 h-5" />
        </a>

        <a
          href={messengerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transform hover:scale-105 transition"
          aria-label="Messenger"
          tabIndex={open ? 0 : -1}
        >
          <FaFacebookMessenger className="w-5 h-5" />
        </a>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
      >
        {open ? <FiX className="w-5 h-5" /> : <FiMessageSquare className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default FloatingContact;
