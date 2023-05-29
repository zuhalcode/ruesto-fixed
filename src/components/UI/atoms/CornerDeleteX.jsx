import axiosClient from "@lib/axios";
import Toast from "@lib/toast";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const CornerDeleteX = ({ productId }) => {
  const handleOnClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient.delete(`/api/products/${productId}/delete`).then((res) =>
          Toast({
            type: "success",
            message: res.data.message,
            timer: 1500,
          }).then(() => location.reload())
        );
      }
    });
  };

  return (
    <div
      className="absolute top-0 right-0 z-10 hidden h-10 w-10 cursor-pointer rounded-bl-full border-b border-l border-yellow-300 text-center text-2xl text-neutral duration-100 hover:bg-yellow-300 hover:text-secondary group-hover:block"
      onClick={handleOnClick}
    >
      <RxCross2 className="ml-3 mt-1" />
    </div>
  );
};

export default CornerDeleteX;
