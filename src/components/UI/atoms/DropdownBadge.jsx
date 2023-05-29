import axiosClient from "@lib/axios";
import { toTitleCase } from "@lib/textFunction";
import Toast from "@lib/toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropdownBadge = ({
  children,
  status = "",
  orderStatus = "",
  orderId,
}) => {
  let bgColorClassOnHover;
  let textColorClass;
  let statusValue = orderStatus ? orderStatus : status;

  const options = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "complete", label: "Complete" },
    { value: "canceled", label: "Canceled" },
  ];

  const [showOptions, setShowOptions] = useState(false);

  const handleOnClick = () => setShowOptions(!showOptions);

  const handleChangeStatus = async (value) => {
    const res = await axiosClient.post(`/api/order/${orderId}/change-status`, {
      status: value,
    });

    if (res.status === 200) {
      Toast({ type: "success", message: res.data.message, timer: 1500 })
        .then(() => location.reload())
        .catch((e) => console.log(e));
    }

    setShowOptions(false);
  };

  switch (statusValue) {
    case "success":
    case "complete":
    case "paid":
      bgColorClassOnHover = "bg-green-100 hover:bg-green-700";
      textColorClass = "text-green-800";
      break;
    case "canceled":
    case "error":
      bgColorClassOnHover = "bg-red-100 hover:bg-red-700";
      textColorClass = "text-red-800";
      break;
    case "primary":
    case "pending":
      bgColorClassOnHover = "bg-blue-100 hover:bg-blue-700";
      textColorClass = "text-blue-800";
      break;
    default:
      bgColorClassOnHover = "bg-yellow-100 hover:bg-yellow-700";
      textColorClass = "text-yellow-800";
      break;
  }

  return (
    <>
      <div className="relative items-center">
        <button
          className={`group inline-flex cursor-pointer items-center rounded-full px-2 py-1 text-xs font-medium hover:text-white
          ${textColorClass} ${bgColorClassOnHover}`}
          onClick={handleOnClick}
        >
          {toTitleCase(children)}
          {options.length > 0 && (
            <MdOutlineKeyboardArrowDown
              className={`mt-[2px] rounded-full text-xs transition-transform duration-500 group-hover:text-white ${textColorClass} ${
                showOptions && "rotate-180 transform "
              }`}
            />
          )}
        </button>

        {showOptions && (
          <div className="absolute right-0 z-10 mt-2 w-48 cursor-pointer rounded-md bg-white py-2 shadow-xl ">
            {options.map((option, index) => (
              <span
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleChangeStatus(option.value)}
              >
                {option.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownBadge;
