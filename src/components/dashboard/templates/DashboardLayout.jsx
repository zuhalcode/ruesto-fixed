import Head from "next/head";
import HeaderInfo from "../molecules/HeaderInfo";
import SearchBar from "../atoms/SearchBar";
import Sidebar from "./DashboardSidebar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardLayout({ children, title = "Ruesto" }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [router, status]);

  return (
    <div className="grid grid-cols-12">
      <Head>
        <link rel="icon" href="/ruesto-logo.ico" />
        <title>Dashboard | {title}</title>
      </Head>
      <Sidebar />
      <div className="col-span-10 flex flex-col">
        <header className="flex w-full justify-between border-b bg-d-primary py-3">
          <SearchBar />
          <HeaderInfo />
        </header>
        <div className="min-h-[535px] w-full bg-neutral p-5">{children}</div>
      </div>
    </div>
  );
}
