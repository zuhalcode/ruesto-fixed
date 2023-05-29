import React from "react";

const Features = () => {
  return (
    <div className="relative z-10 -mt-0 flex flex-col items-center justify-center bg-primary p-5 sm:static sm:z-0 sm:-mt-10 sm:min-h-[500px] sm:p-0">
      <h3>Features</h3>
      <h1 className="mt-3 text-3xl font-bold capitalize text-accent sm:text-4xl">
        our creative services
      </h1>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row">
        <div className="w-full space-y-1 rounded-md border border-secondary p-3 sm:w-[300px]">
          <h2 className="font-bold capitalize text-accent">Healthy food</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A eius
            debitis odio accusantium iure vel, ipsam optio illum maiores
            excepturi?
          </p>
          <p className="navlink max-w-fit">Read More ...</p>
        </div>
        <div className="w-full space-y-1 rounded-md border border-secondary p-3 sm:w-[300px]">
          <h2 className="font-bold capitalize text-accent">Online Order</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A eius
            debitis odio accusantium iure vel, ipsam optio illum maiores
            excepturi?
          </p>
          <p className="navlink max-w-fit">Read More ...</p>
        </div>
        <div className="w-full space-y-1 rounded-md border border-secondary p-3 sm:w-[300px]">
          <h2 className="font-bold capitalize text-accent">Home delivery</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A eius
            debitis odio accusantium iure vel, ipsam optio illum maiores
            excepturi?
          </p>
          <p className="navlink max-w-fit">Read More ...</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
