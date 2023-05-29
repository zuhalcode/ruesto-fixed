import ProfilePic from "@components/UI/atoms/ProfilePic";

import { timeAgo } from "@lib/dateFunction";
import { capitalizeFirstLetter } from "@lib/textFunction";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  const data = [
    {
      name: "zuhal",
      date: new Date("2023-03-02T07:35:56.431Z"),
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Delectus, reprehenderit? Deserunt, debitis laborum rerum odit
          doloribus perspiciatis temporibus beatae, placeat dignissimos
          vitae veritatis magni. Voluptates voluptate quis eius, optio et
          ipsa ducimus facilis a magnam! Tempora ipsa iure, eum quasi quos
          culpa. Quaerat laboriosam minus deserunt. Earum soluta nisi non.`,
      rating: 4,
    },
    {
      name: "jasmin",
      date: new Date("2022-12-22T08:29:13.662+00:00"),
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Delectus, reprehenderit? Deserunt, debitis laborum rerum odit
          doloribus perspiciatis temporibus beatae, placeat dignissimos
          vitae veritatis magni. Voluptates voluptate quis eius, optio et
          ipsa ducimus facilis a magnam! Tempora ipsa iure, eum quasi quos
          culpa. Quaerat laboriosam minus deserunt. Earum soluta nisi non.`,
      rating: 2,
    },
  ];

  const maxRate = 5;

  return (
    <div className="relative z-10 flex max-h-fit flex-col items-center justify-center space-y-5 bg-neutral py-10">
      <h3>Testimonial</h3>
      <h5 className="text-center text-2xl font-bold capitalize text-accent sm:text-left sm:text-4xl">
        what are our customers saying
      </h5>
      <p className="max-w-lg px-5 pb-5 text-center text-base sm:px-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est at quod
        rerum ab saepe eum. Quod vitae natus sunt ipsam.
      </p>
      <div className="mx-auto grid grid-cols-2 gap-2">
        {data.map(({ name, date, rating, comment }, index) => (
          <div
            key={index}
            className="w-[400px] rounded-md bg-white pb-3 shadow-md"
          >
            <div className="flex gap-4 px-4 py-3">
              <ProfilePic />
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-bold">{capitalizeFirstLetter(name)} </p>
                  <p className="text-sm">{timeAgo(date)}</p>
                </div>
                <div className="flex">
                  {Array.from({ length: rating }, (v, i) => (
                    <AiFillStar key={i} className="text-yellow-500" />
                  ))}
                  {Array.from({ length: maxRate - rating }, (v, i) => (
                    <AiFillStar key={i + rating} className="text-gray-500" />
                  ))}
                </div>
              </div>
            </div>
            <p className=" mx-auto w-[90%] border-t border-accent pt-2 text-sm">
              {comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
