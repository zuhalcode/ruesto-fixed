import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="relative z-10 flex max-h-fit items-center justify-center bg-neutral pb-10">
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="mt-20 hidden items-center justify-center px-5 sm:flex">
          <Image
            src="/img/products/snack/waffle-bg.png"
            alt=""
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="mt-5 space-y-5 p-10 text-center sm:mt-24 sm:max-w-sm sm:p-0 sm:text-left ">
          <h3>About Us</h3>
          <h1 className="text-4xl font-bold capitalize text-accent">
            the best enjoyable place around you
          </h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            voluptatibus nihil facilis incidunt accusantium est soluta, velit
            suscipit magni aliquid veritatis fugiat quibusdam praesentium
            consequuntur, similique illum voluptate. Doloribus, dolorem?
          </p>
          <button className="rounded-xl bg-secondary px-3 py-2 text-white">
            Learn Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
