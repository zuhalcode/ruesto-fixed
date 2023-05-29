import React from "react";

export default function Chart() {
  return (
    <div className="h-[200px] w-full bg-red-500">
      <ul className="flex flex-row items-baseline justify-start">
        <li className="relative h-full w-5 space-y-5 bg-blue-500">
          <div className="chart-data"></div>
          <p className="absolute z-10">Jan</p>
        </li>
        <li className="relative h-full w-5 bg-blue-500">
          <div className="chart-data"></div>
          <p className="">Feb</p>
        </li>
      </ul>
    </div>
  );
}
