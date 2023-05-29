import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillDashboard, AiOutlineHome } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiBox, FiUsers } from "react-icons/fi";

export default function SidebarLink({ children, menu }) {
  const pathname = usePathname();

  return (
    <li
      className={`flex w-full justify-center border-l-[3px] ${
        menu.name === "dashboard" && pathname === menu.url
          ? "border-l-d-secondary"
          : menu.name !== "dashboard" &&
            pathname &&
            pathname.startsWith(menu.url)
          ? "border-l-d-secondary"
          : ""
      }`}
    >
      <Link
        href={menu.url}
        className={`flex w-[80%] items-center space-x-5 rounded-md ${
          menu.name === "dashboard" && pathname === menu.url
            ? "bg-d-secondary px-5 text-neutral"
            : menu.name !== "dashboard" &&
              pathname &&
              pathname.startsWith(menu.url)
            ? "bg-d-secondary px-5 text-neutral"
            : "text-secondabg-d-secondary"
        }  py-3 `}
      >
        {menu.name === "dashboard" ? (
          <AiFillDashboard />
        ) : menu.name === "products" ? (
          <FiBox />
        ) : menu.name === "home" ? (
          <AiOutlineHome />
        ) : menu.name === "customers" ? (
          <FiUsers />
        ) : (
          menu.name === "orders" && <FaMoneyBillWave />
        )}

        <p className="text-sm ">{children}</p>
      </Link>
    </li>
  );
}
