import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DashboardLayout from "@components/dashboard/templates/DashboardLayout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const menu = ["", "", "", ""];

  return (
    <DashboardLayout head={"Dashboard"}>
      <div className="grid w-full grid-cols-3 gap-5">
        <ul className="col-span-2 grid grid-cols-2 items-center justify-between gap-5 ">
          {menu.map((menu, index) => (
            <li
              key={index}
              className="flex w-full items-center rounded-md bg-white px-3 py-2"
            >
              <div className="flex h-10 w-10 items-center rounded-md bg-blue-200 p-3 text-blue-700">
                <BsBarChartFill className="" />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="px-3 font-bold">
                  <p className="text-2xl">230k</p>
                  <p className="text-sm text-slate-300">Sales</p>
                </div>
                <MdOutlineKeyboardArrowRight className="text-2xl text-blue-500" />
              </div>
            </li>
          ))}
        </ul>
        <div className="col-span-1 flex flex-col gap-1 rounded-md bg-blue-500 text-center">
          <p className="mt-3 text-xl text-white">Congratulation John</p>
          <p className="text-sm text-white">now you are top saler</p>
          <p className="text-2xl font-bold text-white">$48,5k</p>
          <div className="mx-auto mt-2 w-1/2 rounded-lg bg-white px-2 py-1 text-sm text-blue-500">
            View Sales
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
