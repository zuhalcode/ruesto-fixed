import { removeItemFromCart } from "@store/actions/cartAction";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch } from "react-redux";

const RemoveItemCartBtn = ({
  children,
  className = "min-w-[2rem] p-2 hover:bg-neutral",
  productId,
}) => {
  const dispatch = useDispatch();
  const { data } = useSession();

  const handleOnRemoveCartItem = async (productId) => {
    const userId = data?.user._id;
    console.log(userId);
    dispatch(removeItemFromCart(userId, productId));
  };

  return (
    <div
      className={`cursor-pointer rounded-full hover:text-secondary ${className}`}
      onClick={() => handleOnRemoveCartItem(productId)}
    >
      {children}
    </div>
  );
};

export default RemoveItemCartBtn;
