import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div className="grid min-h-screen sm:grid-cols-12">
      <div className="bg-home-rounded-first-section relative col-span-5 flex items-center justify-end">
        <div className="relative z-10 space-y-8 p-10 sm:w-[80%] sm:p-0">
          <h1 className="text-5xl font-bold uppercase text-accent">
            our best healthy food
          </h1>
          <div className="space-y-5">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              reprehenderit? Deserunt, debitis laborum rerum odit doloribus
              perspiciatis temporibus beatae, placeat dignissimos vitae
              veritatis magni. Voluptates voluptate quis eius, optio et ipsa
              ducimus facilis a magnam! Tempora ipsa iure, eum quasi quos culpa.
              Quaerat laboriosam minus deserunt. Earum soluta nisi non.
            </p>
            <button className="rounded-xl bg-secondary px-3 py-2 text-white">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-7 hidden bg-secondary sm:block">
        <div className="relative right-0 top-16">
          <Image
            src="/img/products/salmon/salmon.png"
            alt=""
            width={1000}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
