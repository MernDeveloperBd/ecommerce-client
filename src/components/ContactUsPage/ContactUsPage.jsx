import { useEffect, useRef, useState } from "react";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaWhatsapp,
    FaFacebookMessenger,
    FaCopy,
    FaDownload,
    FaSpinner,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";


export default function ContactUsPage() {
    // ====== Customize these: ======
    const companyName = "MM Fashion World";
    const contactEmail = "marifamisam@gmail.com";
    const contactPhone = "+8801749889595"; // for display
    const address = "Mohammadpur, Dhaka, Bangladesh";
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "8801749889595"; // no +, no spaces
    const messengerLink = import.meta.env.VITE_MESSENGER_LINK || "https://m.me/MMFashionWorld";
    const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
    const canonical = siteUrl ? `${siteUrl.replace(/\/$/, "")}/contact` : (typeof window !== "undefined" ? window.location.href : "");

    // ====== state ======
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
        // honeypot field (bots often fill hidden fields)
        website: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // ====== helpers ======
    const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
    const isValidBDMobile = (s) => {
        const digits = String(s || "").replace(/\D/g, "");
        // valid formats: 11 digits starting with 01 (local), or 13 digits starting with 8801 (with country code)
        return (digits.length === 11 && digits.startsWith("01")) || (digits.length === 13 && digits.startsWith("8801"));
    };

    const validate = () => {
        const e = {};
        if (!formData.name.trim()) e.name = "নাম লিখুন";
        else if (formData.name.trim().length < 2) e.name = "সঠিক নাম লিখুন";

        if (!formData.email.trim()) e.email = "ইমেইল দিন";
        else if (!isValidEmail(formData.email)) e.email = "বৈধ ইমেইল দিন";

        if (!formData.mobile.trim()) e.mobile = "মোবাইল নম্বর দিন";
        else if (!isValidBDMobile(formData.mobile)) e.mobile = "বাংলাদেশের মোবাইল (যেমন 01XXXXXXXXX) দিন";

        if (!formData.message.trim() || formData.message.trim().length < 8) e.message = "সংক্ষিপ্তভাবে পর্যাপ্ত বার্তা দিন (কমপক্ষে 8 অক্ষর)";

        // honeypot: if website field filled -> likely bot
        if (formData.website && formData.website.trim().length > 0) {
            e.website = "spam";
        }

        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    // copy email
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactEmail);
            toast.success("ইমেইল কপি করা হয়েছে");
        } catch {
            toast.error("কপি করা যায়নি");
        }
    };

    // vCard download
    const downloadVCard = () => {
        const vcard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:${companyName}`,
            `ORG:${companyName}`,
            `TEL;WORK;VOICE:${contactPhone}`,
            `EMAIL;WORK:${contactEmail}`,
            `ADR;WORK:;;${address}`,
            "END:VCARD",
        ].join("\n");

        const blob = new Blob([vcard], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${companyName.replace(/\s+/g, "_")}.vcf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        toast.success("Contact vCard download Start");
    };

   // helper function (তুমি কম্পোনেন্টের উপরে, handleSubmit এর আগে রাখো)
const buildEndpoint = (baseUrl) => {
  const base = (baseUrl || 'http://localhost:5000').replace(/\/+$/, '');
  // যদি base এ ইতিমধ্যে /api থাকে (example: http://localhost:5000/api), তখন পুনরায় /api যোগ করবো না
  const hasApi = /\/api(\/|$)/.test(base);
  return hasApi ? `${base}/contact` : `${base}/api/contact`;
};

// Updated handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  const v = validate();
  if (Object.keys(v).length > 0) {
    if (v.website === "spam") {
      setSentSuccess(true);
      setFormData({ name: "", email: "", mobile: "", message: "", website: "" });
      toast.success("Message sent successfully!");
      return;
    }
    setErrors(v);
    toast.error("ফর্মে কিছু ভুল আছে — অনুগ্রহ করে ঠিক করে পাঠান");
    return;
  }

  setLoading(true);
  try {
    // read VITE_API_URL (set it to http://localhost:5000 in frontend .env)
    const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim();
    const endpoint = buildEndpoint(apiBase); // result: e.g. http://localhost:5000/api/contact

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      message: formData.message.trim(),
      website: formData.website || "", // honeypot
      source: "contact-page",
      submittedAt: new Date().toISOString(),
    };

    const resp = await axios.post(endpoint, payload, { timeout: 20000 });

    const ok = resp?.status >= 200 && resp?.status < 300 && resp?.data?.success !== false;
    if (ok) {
      toast.success("Message sent successfully!");
      setSentSuccess(true);
      setFormData({ name: "", email: "", mobile: "", message: "", website: "" });
    } else {
      const serverMsg = resp?.data?.message || "Server rejected the request";
      toast.error(serverMsg);
    }
  } catch (err) {
    console.error('Submit error:', err);
    const errMsg = err?.response?.data?.message || err?.message || "Failed to send message. Try again later.";
    toast.error(errMsg);
  } finally {
    if (mountedRef.current) setLoading(false);
  }
};

    // JSON-LD structured data for SEO
    const jsonLD = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": {
            "@type": "Organization",
            "name": companyName,
            "url": siteUrl || "",
            "logo": siteUrl ? `${siteUrl.replace(/\/$/, "")}/logo.png` : undefined,
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": contactPhone,
                    "contactType": "customer support",
                    "email": contactEmail,
                    "areaServed": "BD",
                    "availableLanguage": ["Bangla", "English"]
                }
            ]
        }
    };

    // map query
    const mapQuery = encodeURIComponent(address);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#7333db10] to-[#0ea5a710] py-12 px-4 ">
            <Helmet>
                <title>Contact Us - {companyName} | আমরা সাহায্য করতে প্রস্তুত</title>
                <meta
                    name="description"
                    content={`হুইট করুন — ${companyName}-এ যোগাযোগ করুন। ফোন: ${contactPhone}। ইমেইল: ${contactEmail}. আমাদের টিম ২৪–৪৮ ঘণ্টার ভেতর রিপ্লাই করে।`}
                />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={`যোগাযোগ — ${companyName}`} />
                <meta
                    property="og:description"
                    content={`Contact ${companyName} — ফোন: ${contactPhone} • ইমেইল: ${contactEmail} • ${address}`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonical} />
                {/* Optional: og:image */}
                <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
            </Helmet>

            <Toaster position="top-right" />

            <div className="max-w-6xl mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
                    <p className="text-gray-600 mt-2">
                        কোনো প্রশ্ন, অর্ডার সম্পর্কিত সমস্যা বা কাস্টম ডিজাইন আসলে আমাদের জানান — আমরা সাহায্য করতে প্রস্তুত।
                    </p>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 border border-white/40"
                >
                    {/* LEFT: Contact info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{companyName}</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Address: {address}
                            </p>
                        </div>

                        <div className="grid gap-3">
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm border">
                                <FaMapMarkerAlt className="text-2xl text-green-600" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">Office</div>
                                    <div className="text-sm text-gray-600">{address}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm border">
                                <FaPhone className="text-2xl text-green-600" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">Phone</div>
                                    <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="text-sm text-gray-600 hover:underline">
                                        {contactPhone}
                                    </a>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href={`https://wa.me/${whatsappNumber}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-3 py-2 rounded-md bg-green-600 text-white text-xs hover:bg-green-700"
                                        aria-label="WhatsApp"
                                        title="WhatsApp"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm border">
                                <FaEnvelope className="text-2xl text-green-600" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">Email</div>
                                    <a href={`mailto:${contactEmail}`} className="text-sm text-gray-600 hover:underline">{contactEmail}</a>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={copyEmail}
                                        className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                                        title="Copy email"
                                        aria-label="Copy email"
                                    >
                                        <FaCopy />
                                    </button>
                                    <button
                                        onClick={downloadVCard}
                                        className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                                        title="Download vCard"
                                        aria-label="Download vCard"
                                    >
                                        <FaDownload />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm border">
                                <FaFacebookMessenger className="text-2xl text-blue-600" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">Messenger</div>
                                    <a href={messengerLink} target="_blank" rel="noreferrer" className="text-sm text-gray-600 hover:underline">
                                        Chat on Messenger
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                            <strong>সাধারণত উত্তর সময়:</strong> ২৪–৪৮ ঘন্টা (বিজনেস ডে)। জরুরি হলে ফোন বা WhatsApp ব্যবহার করুন।
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div>
                        {!sentSuccess ? (
                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                {/* hidden honeypot */}
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    tabIndex="-1"
                                    className="absolute left-[-9999px] opacity-0 h-0 w-0"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${errors.name ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:ring-green-300"} bg-white`}
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? "name-error" : undefined}
                                    />
                                    {errors.name && <p id="name-error" className="text-xs text-red-600 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${errors.email ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:ring-green-300"} bg-white`}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                    />
                                    {errors.email && <p id="email-error" className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="017XXXXXXXX"
                                        className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${errors.mobile ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:ring-green-300"} bg-white`}
                                        aria-invalid={!!errors.mobile}
                                        aria-describedby={errors.mobile ? "mobile-error" : undefined}
                                    />
                                    {errors.mobile && <p id="mobile-error" className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write here..."
                                        className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${errors.message ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:ring-green-300"} bg-white resize-none`}
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? "message-error" : undefined}
                                    />
                                    {errors.message && <p id="message-error" className="text-xs text-red-600 mt-1">{errors.message}</p>}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                                        aria-label="Send message"
                                    >
                                        {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                                        <span>{loading ? "পাঠানো হচ্ছে..." : "Send Message"}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ name: "", email: "", mobile: "", message: "", website: "" });
                                            setErrors({});
                                        }}
                                        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                    >
                                        Reset
                                    </button>
                                </div>

                                <div className="text-xs text-gray-500">
                                    By sending you agree we'll process your data to reply. See our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
                                </div>
                            </form>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="p-6 rounded-xl bg-white border shadow-sm text-center">
                                    <h3 className="text-xl font-semibold text-gray-800">ধন্যবাদ!</h3>
                                    <p className="text-gray-600 mt-2">We have received your message — we will contact you within 24–48 hours.</p>

                                    <div className="mt-4 flex justify-center gap-3">
                                        <a
                                            href={`https://wa.me/${whatsappNumber}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 rounded-full bg-green-600 text-white flex items-center gap-2"
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </a>

                                        <a
                                            href={messengerLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 rounded-full bg-blue-600 text-white flex items-center gap-2"
                                        >
                                            <FaFacebookMessenger /> Messenger
                                        </a>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            onClick={() => {
                                                setSentSuccess(false);
                                                setErrors({});
                                            }}
                                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Map + FAQ */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-4 border shadow-sm">
                        <h4 className="font-semibold mb-2">Our Location</h4>
                        <div className="w-full h-64 rounded-lg overflow-hidden border">
                            <iframe
                                title="MM Fashion World Location"
                                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                                className="w-full h-full border-0"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border shadow-sm">
                        <h4 className="font-semibold mb-2">General Questions</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            <div>
                                <p className="mb-1"><strong>অর্ডারের স্ট্যাটাস জানতে কিভাবে?</strong> </p>
                                <p>আমরা অর্ডার কনফার্মেশনের ইমেইল/এসএমএস দিয়ে ট্র্যাকিং দিয়েছি; এছাড়া Contact ফর্ম বা WhatsApp-এ জানতে পারেন।</p>
                            </div>
                            <div>
                                <p className="mb-1"><strong>রিটার্ন নীতি?</strong> </p>
                                <p>Damaged or wrong item হলে ৭ দিনের মধ্যে রিটার্ন গ্রহণ করা হয় — বিস্তারিত পেজে আছে।</p>
                            </div>
                            <div>
                                <p className="mb-1"><strong>কাস্টম ডিজাইন করতে চান?</strong></p>
                                <p> Message এ আপনার প্রয়োজন— আমরা কাস্টম অর্ডার নেব। এখনো সব প্রডাক্ট নেওয়া হয় না। কিছু কিছু প্রডাক্ট নেওয়া হয়। তবে পরবর্তীতে আরো বাড়ানো হবে</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}