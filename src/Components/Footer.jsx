import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <p className="text-sm text-center md:text-left">
          © 2026 <span className="font-semibold text-white">Fresh Grocery Store</span>
        </p>

        {/* Center */}
        <p className="text-xs text-gray-400 text-center">
          Fresh • Healthy • Delivered
        </p>

        {/* Right */}
        <p className="text-sm text-gray-400 text-center md:text-right">
          All rights reserved
        </p>

      </div>
    </footer>
  );
};

export default Footer;
