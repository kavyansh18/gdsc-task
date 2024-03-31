import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="text-center mt-2 text-4xl text-blue-700 font-extrabold w-[400px] mx-auto rounded-xl p-4 drop-shadow-xl " style={{ backgroundColor: '#F5B400' }}>QuickMark Preview</div>

      <div className="header flex justify-between items-center md:mx-[450px] mx-6 mt-10">
        
        <NavLink
          to="/"
          className="font-bold text-sm md:text-2xl hover:text-blue-700 text-white cursor-pointer w-[270px] mx-auto rounded-xl p-4 drop-shadow-xl"  style={{ backgroundColor: '#109D58' }}
        >
          Using React Library
        </NavLink>

        <NavLink
          to="/app"
          className="font-bold text-sm md:text-2xl hover:text-blue-700 cursor-pointer text-white w-400px] mx-auto rounded-xl p-4 drop-shadow-xl" style={{ backgroundColor: '#109D58' }}
        >
          Custom Manipulation
        </NavLink>
      </div>
    </>
  );
};

export default Header;
