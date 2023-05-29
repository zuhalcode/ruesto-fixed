import Image from "next/image";
import React from "react";

const ProfilePic = ({
  url = "/img/profile.jpg",
  className = "",
  size = "sm",
}) => {
  return (
    <Image
      alt="profile"
      className={`${className} rounded-full`}
      src={url}
      width={size === "sm" ? 50 : 100}
      height={size === "sm" ? 50 : 100}
    />
  );
};

export default ProfilePic;
