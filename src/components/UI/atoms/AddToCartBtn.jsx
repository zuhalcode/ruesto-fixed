// import axiosClient from "@lib/axios";
import { addToCart } from "@store/actions/cartAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const AddToCartBtn = ({ children, btnDefault = true, id, }) => {
  const router = useRouter();
  const productId = router.query.id || id;

  const dispatch = useDispatch();
  const { data } = useSession();
  const { loading } = useSelector((state) => state.cart);

  const handleOnClick = () => {
    const userId = data?.user._id;
    if (userId) dispatch(addToCart(userId, productId));
  };

  return (
    <>
      {btnDefault ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <button
              className="w-full rounded-sm border bg-secondary py-3 font-semibold uppercase text-neutral duration-300 hover:border-secondary hover:bg-white hover:text-secondary"
              onClick={handleOnClick}
            >
              {children || "Add to cart"}
            </button>
          )}
        </>
      ) : (
        <div className="group absolute top-10 left-10 mx-auto flex h-0 w-full translate-y-0 skew-x-0 items-center justify-center bg-black bg-opacity-80 duration-500 sm:w-[270px] sm:group-hover:h-[270px]">
          {loading ? (
            <>
              <span className="relative hidden h-12 w-12 animate-spin overflow-hidden rounded-full border-t-2 border-b-2 border-neutral opacity-0 transition-all duration-100 group-hover:opacity-100 sm:inline"></span>
            </>
          ) : (
            <div
              className={`add-to-cart-btn relative hidden translate-y-40 overflow-hidden border border-neutral px-4 py-3 uppercase tracking-widest text-neutral opacity-0 duration-300 hover:before:scale-x-100 hover:after:scale-x-100 group-hover:translate-y-0 group-hover:opacity-100 sm:block`}
              onClick={handleOnClick}
            >
              Add to cart
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
