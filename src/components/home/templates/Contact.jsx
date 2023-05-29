import React from "react";

const Contact = () => {
  return (
    <div className="section-contact-us relative flex items-center justify-center bg-[url('/img/bg-food.jpg')] bg-cover bg-center sm:p-10">
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center gap-5 p-10 text-neutral sm:w-[60%]">
        <h2 className="text-center text-2xl font-bold capitalize sm:text-left sm:text-4xl">
          do not miss the test!
        </h2>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ex
          odit qui earum ipsam impedit repellat recusandae iusto molestias!
          Accusamus ut maxime modi? Dolorem voluptates necessitatibus excepturi
          id maiores cupiditate.
        </p>
        <div className="flex gap-5">
          <button className="rounded-full border border-neutral bg-transparent px-3 py-2 capitalize text-white">
            Contact with us
          </button>
          <button className="rounded-full bg-secondary px-3 py-2 text-white">
            Learn Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
