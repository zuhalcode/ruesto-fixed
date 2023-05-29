const Badge = ({
  children,
  status = "",
  orderStatus = "",
  button = false,
  orderId = "",
}) => {
  let bgColorClass;
  let bgColorClassOnHover;
  let textColorClass;
  let statusValue = orderStatus ? orderStatus : status;

  const handleOnClick = () =>
    (window.location.href = `/dashboard/orders/${orderId}`);

  switch (statusValue) {
    case "success":
    case "complete":
      bgColorClass = "bg-green-100";
      bgColorClassOnHover = "bg-green-100 hover:bg-green-700";
      textColorClass = "text-green-800";
      break;
    case "canceled":
    case "paid":
    case "error":
      bgColorClass = "bg-red-100";
      bgColorClassOnHover = "bg-red-100 hover:bg-red-700";
      textColorClass = "text-red-800";
      break;
    case "primary":
    case "pending":
      bgColorClass = "bg-blue-100";
      bgColorClassOnHover = "bg-blue-100 hover:bg-blue-700";
      textColorClass = "text-blue-800";
      break;
    default:
      bgColorClass = "bg-yellow-100";
      bgColorClassOnHover = "bg-yellow-100 hover:bg-yellow-700";
      textColorClass = "text-yellow-800";
      break;
  }

  return (
    <>
      {button ? (
        <span
          className={`inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 text-xs font-medium hover:text-white ${bgColorClassOnHover} ${textColorClass}`}
          onClick={handleOnClick}
        >
          {children}
        </span>
      ) : (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColorClass} ${textColorClass}`}
        >
          {children}
        </span>
      )}
    </>
  );
};

export default Badge;
