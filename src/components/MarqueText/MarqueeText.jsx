// src/components/common/MarqueeText.jsx
import React from "react";
import './marqueText.css'

const MarqueeText = ({
  items = [],          // ReactNode[] বা string[] - একাধিক মেসেজ
  speedSec = 20,       // কত সেকেন্ডে একচক্র ঘুরবে (কম হলেই দ্রুত)
  gapPx = 14,          // আইটেমের মাঝে গ্যাপ
  pauseOnHover = true, // হোভার করলে পজ হবে
  className = "",      // অতিরিক্ত ক্লাস পাঠাতে পারেন
}) => {
  const renderGroup = (groupKey) => (
    <div className="marquee__group" aria-label="marquee-group" key={groupKey}>
      {items.map((node, idx) => (
        <React.Fragment key={`${groupKey}-${idx}`}>
          <span className="marquee__item">{node}</span>
          {idx !== items.length - 1 && (
            <span className="marquee__sep" aria-hidden>
              •
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${className}`}
      style={
        {
          // কাস্টম প্রপার্টিজ
          "--duration": `${speedSec}s`,
          "--gap": `${gapPx}px`,
        } 
      }
    >
      <div className={`marquee__inner ${pauseOnHover ? "marquee--hover-pause" : ""}`}>
        {renderGroup("g1")}
        {renderGroup("g2")}
      </div>

      {/* Fade edges */}
      <span className="marquee__fade marquee__fade--left" />
      <span className="marquee__fade marquee__fade--right" />
    </div>
  );
};

export default MarqueeText;