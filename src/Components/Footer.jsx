import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left */}
        <p className="text-xs sm:text-sm text-center md:text-left">
          © 2026 <span className="font-semibold text-white">Fresh Grocery Store</span>
        </p>

        {/* Center */}
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 text-center">
          Fresh • Healthy • Delivered
        </p>

        {/* Right */}
        <p className="text-xs sm:text-sm text-gray-400 text-center md:text-right">
          All rights reserved
        </p>

      </div>
    </footer>
  );
};

export default Footer;