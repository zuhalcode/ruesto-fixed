import Loading from "@components/UI/atoms/Loading";
import ProductImage from "@components/UI/atoms/ProductImage";
import { toRupiah } from "@lib/textFunction";
import { fetchCartItems, removeItemFromCart } from "@store/actions/cartAction";
import { useSession } from "next-auth/react";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const SideCart = () => {
  const { cartItems, totalPrice, loading } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const { data } = useSession();

  useEffect(() => {
    const userId = data?.user._id;
    dispatch(fetchCartItems(userId));
  }, [data, dispatch]);

  const handleOnRemoveCartItem = async (productId) => {
    const userId = data?.user._id;
    dispatch(removeItemFromCart(userId, productId));
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-30 hidden h-full w-1/3 transform bg-white p-4 shadow-lg transition-transform duration-500 sm:block ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="mb-4 text-xl font-bold">Cart</h2>
        {loading ? (
          <Loading />
        ) : cartItems?.length > 0 ? (
          <ul className="side-cart max-h-[400px] space-y-5 overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between  space-x-2 border-b border-accent pb-3"
              >
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <ProductImage width={50} src={item.image} />
                  <div className="flex flex-col">
                    <h2 className="capitalize">{item.name}</h2>
                    <div className="flex space-x-2">
                      <p className="text-center text-secondary">
                        {toRupiah(item.price)}
                      </p>
                      <p className="text-center">x {item.quantity}</p>
                    </div>
                  </div>
                </div>
                <BsTrashFill
                  className="cursor-pointer text-xl hover:text-secondary"
                  onClick={() => handleOnRemoveCartItem(item._id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          !loading && cartItems === 0 && <p>Your cart is empty.</p>
        )}
        <p className="mt-4 text-right font-bold">
          Total: {toRupiah(totalPrice)}
        </p>

        <span
          className="fixed -left-[3.3rem] top-24 z-20 cursor-pointer rounded-l-full bg-accent py-3 px-3 text-neutral shadow-lg outline-none "
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiOutlineShoppingCart className="text-3xl" />
        </span>
        <Link href="/cart">
          <button className="my-5 w-full rounded-sm border border-accent bg-neutral py-2 font-semibold uppercase text-accent duration-100 hover:border hover:border-neutral hover:bg-accent hover:text-neutral">
            Go to Cart
          </button>
        </Link>
      </div>
    </>
  );
};

export default SideCart;
