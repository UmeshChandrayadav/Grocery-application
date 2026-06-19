import React from "react";

const Header = () => {
  return (
    <header className="bg-emerald-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 text-center">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
          Daily Basket
        </h1>

        <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-green-100">
          Quality You Can Trust
        </p>

      </div>
    </header>
  );
};

export default Header;