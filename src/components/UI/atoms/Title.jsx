import React from "react";

export default function Title({ children }) {
  return (
    <p className="text-base font-semibold uppercase text-slate-400">
      {children}
    </p>
  );
}
