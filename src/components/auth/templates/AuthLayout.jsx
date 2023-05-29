import Head from "next/head";

export default function AuthLayout({ children, head = "Ecommerce" }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/ruesto-logo.ico" />
        <title>{head}</title>
      </Head>
      <div className="bg-slate-100 p-8">
        <div className="mx-auto grid w-[80%] grid-cols-12">
          <div className="col-span-8 ">
            <div className="flex h-[550px] w-full items-center bg-[url('/img/products/burger/burger.jpg')] bg-cover ">
              <p className="text-center text-4xl font-semibold uppercase text-white">
                &quot; Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat nesciunt excepturi voluptates reprehenderit illum minus
                voluptate! &quot;
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-white">{children}</div>
        </div>
      </div>
    </>
  );
}
