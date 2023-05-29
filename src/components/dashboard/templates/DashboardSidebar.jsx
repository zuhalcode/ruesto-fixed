import Logo from "@components/UI/atoms/Logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import SidebarLink from "../atoms/SidebarLink";

export default function Sidebar() {
  const { data } = useSession();
  const isAdmin = data?.user.isAdmin;

  const adminMenu = [
    { name: "dashboard", url: "/dashboard" },
    { name: "products", url: "/dashboard/products" },
    { name: "customers", url: "/dashboard/customers" },
    { name: "orders", url: "/dashboard/orders" },
  ];

  const userMenu = [
    { name: "dashboard", url: "/dashboard" },
    { name: "orders", url: "/dashboard/orders" },
  ];

  return (
    <div className="col-span-2 min-h-screen border-r border-r-neutral bg-d-primary">
      <Logo className="mx-auto" mode="dark" />
      <ul className="mt-0 flex flex-col items-center justify-center space-y-2">
        {isAdmin
          ? adminMenu.map((menu, index) => (
              <SidebarLink menu={menu} key={index}>
                {menu.name.toUpperCase()}
              </SidebarLink>
            ))
          : userMenu.map((menu, index) => (
              <SidebarLink menu={menu} key={index}>
                {menu.name.toUpperCase()}
              </SidebarLink>
            ))}
        <li className="flex w-full justify-center">
          <Link
            href="/"
            className="flex w-[80%] items-center space-x-5 rounded-md py-3 pl-1"
          >
            <AiOutlineHome />
            <p className="text-sm uppercase">Home</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
