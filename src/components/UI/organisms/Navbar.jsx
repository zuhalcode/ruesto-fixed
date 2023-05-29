import DropdownProfile from "@components/dashboard/atoms/DropdownProfile";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import LinkButton from "../atoms/LinkButton";
import Logo from "../atoms/Logo";

const Navbar = () => {
  const { status } = useSession();
  const [navOpen, setNavOpen] = useState(false);

  const handleOnClick = () => setNavOpen(!navOpen);

  return (
    <>
      <div className="fixed z-30 flex w-full justify-between bg-white shadow-sm sm:bg-opacity-90 sm:px-10">
        <Logo />
        {!navOpen ? (
          <AiOutlineMenu
            className="absolute right-0 top-5 mx-5 cursor-pointer text-4xl text-accent sm:m-0 sm:hidden"
            onClick={handleOnClick}
          />
        ) : (
          <RxCross2
            className="absolute right-0 top-5 mx-5 cursor-pointer text-4xl text-accent sm:m-0 sm:hidden"
            onClick={handleOnClick}
          />
        )}

        <ul
          className={`absolute right-0 -z-30 flex w-full flex-col items-center justify-around gap-2 bg-white px-2 pb-3 transition-all duration-500 sm:static sm:w-[60%]
          sm:flex-row sm:gap-0 sm:bg-transparent sm:bg-none sm:pb-0 ${
            navOpen
              ? "top-[4.8rem] opacity-100"
              : "-top-32 opacity-0 sm:opacity-100"
          }`}
        >
          <LinkButton>Home</LinkButton>
          <LinkButton link="/products">Products</LinkButton>
          <LinkButton link="/contact">Contact</LinkButton>
          <LinkButton link="/about">About</LinkButton>
          {status === "unauthenticated" ? (
            <>
              <LinkButton link="/auth/register">Sign Up</LinkButton>
              <LinkButton link="/auth/login">Sign In</LinkButton>
            </>
          ) : (
            <>
              <LinkButton link="/cart">Cart</LinkButton>
              <DropdownProfile />
            </>
          )}
        </ul>
      </div>
      <hr className="border-slate-500" />
    </>
  );
};

export default Navbar;
