import { Link } from "react-router-dom";

const OneBanner = () => {
  const img =
    "https://i.ibb.co/S7MP82GQ/banner-width.png"; // চাইলে props দিয়ে ডাইনামিক করতে পারেন

  return (
    <section className="bg-white py-4 container">
      <div className="container relative">
        {/* soft glow behind */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 -top-1 bottom-2 rounded-2xl bg-gradient-to-r from-violet-500/25 via-fuchsia-500/20 to-pink-500/25 blur-2xl"
        />
        {/* gradient border card */}
        <Link
          to="/productListing"
          className="group relative block rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 p-[2px] shadow-[0_10px_30px_rgba(99,102,241,0.25)]"
        >
          <div className="relative rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
            {/* banner image */}
            <div className="relative h-[150px] md:h-[180px] lg:h-[200px]">
              <img
                src={img}
                alt="Promotional banner"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* top-left badge */}
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] md:text-[12px] font-semibold text-violet-700 shadow-md">
                Limited Offer
              </div>

              {/* bottom-right CTA pill (visual only, পুরো ব্যানারই ক্লিকেবল) */}
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 text-white backdrop-blur-sm px-3 py-1.5 text-xs md:text-sm font-medium shadow-sm">
                Shop now →
              </div>

              {/* shine sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 -left-1/3 h-full w-1/3 translate-x-0 skew-x-[-20deg] bg-white/15 blur-md opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[260%] group-hover:opacity-100"
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default OneBanner;