import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="text-center mt-4 text-4xl text-blue-700 font-extrabold">Markdown</div>
      <div className="header flex justify-between items-center md:mx-[450px] mx-6 mt-10">
        <NavLink
          to="/"
          className="font-bold text-sm md:text-2xl hover:text-blue-700 cursor-pointer text-white"
        >
          Custom Manipulation
        </NavLink>
        <NavLink
          to="/library"
          className="font-bold text-sm md:text-2xl hover:text-blue-700 text-white cursor-pointer"
        >
          Using React Library
        </NavLink>
      </div>
    </>
  );
};

export default Header;
