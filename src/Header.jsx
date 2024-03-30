import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="text-center mt-4 text-4xl text-blue-700 font-extrabold">QuickMark Preview</div>
      <div className="header flex justify-between items-center md:mx-[450px] mx-6 mt-10">
        
        <NavLink
          to="/"
          className="font-bold text-sm md:text-2xl hover:text-blue-700 text-white cursor-pointer"
        >
          Using React Library
        </NavLink>

        <NavLink
          to="/app"
          className="font-bold text-sm md:text-2xl hover:text-blue-700 cursor-pointer text-white"
        >
          Custom Manipulation
        </NavLink>
      </div>
    </>
  );
};

export default Header;
