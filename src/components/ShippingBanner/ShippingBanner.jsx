import { FaShippingFast } from "react-icons/fa";

const ShippingBanner = () => {
  return (
    <section className="bg-white py-1">
      <div className="container mx-auto px-4">
        {/* Gradient Border Card */}
        <div className="freeshipping relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 p-[2px]">
          <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm">
            {/* Soft gradient blobs (decor) */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-400/20 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-pink-400/20 blur-2xl" />

            <div className="relative flex flex-col md:flex-row items-center md:justify-between gap-5 md:gap-6 px-5 py-6 md:px-8 md:py-8">
              {/* Left: Icon + Title */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg">
                  <FaShippingFast className="text-2xl md:text-3xl" />
                </div>
                <div className="leading-tight">
                  <h3 className="text-xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    FREE SHIPPING
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    First order + orders over <span className="font-semibold text-gray-800">TK 3000</span>
                  </p>
                </div>
              </div>

              {/* Middle: Info pill */}
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[12px] md:text-[13px] font-medium text-gray-700 shadow-sm">
                  No extra fees • Fast delivery • Nationwide
                </span>
              </div>

              {/* Right: Price badge */}
              <div className="flex flex-col items-center md:items-end">
                <div className="rounded-full border border-violet-200 bg-white px-4 py-2 shadow-sm">
                  <span className="text-sm font-semibold text-gray-700">Only</span>{" "}
                  <span className="text-xl md:text-2xl font-extrabold text-violet-700">Tk 3000*</span>
                </div>
                <span className="mt-1 text-[11px] text-gray-400">Terms & conditions apply</span>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
    </section>
  );
};

export default ShippingBanner;