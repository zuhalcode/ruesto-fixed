import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const LinkButton = ({ children, link = "/" }) => {
  const router = useRouter();
  return (
    <li className="group w-full cursor-pointer py-3 text-center hover:bg-slate-400 hover:bg-none sm:p-0 sm:hover:bg-transparent">
      <Link
        href={link}
        className={`navlink ${
          router.asPath.startsWith(`${link}/`) || router.asPath === link
            ? "sm:text-secondary sm:after:scale-x-100"
            : "group-hover:text-white sm:text-accent sm:hover:text-accent sm:group-hover:text-accent"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

export default LinkButton;
