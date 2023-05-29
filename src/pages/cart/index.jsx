import RootLayout from "@components/UI/templates/RootLayout";
import { toRupiah } from "@lib/textFunction";
import { fetchCartItems, removeItemFromCart } from "@store/actions/cartAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductImage from "@components/UI/atoms/ProductImage";
import CheckoutBtn from "@components/UI/atoms/CheckoutBtn";
import "react-loading-skeleton/dist/skeleton.css";

const Cart = () => {
  const { cartItems, loading, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    const userId = data?.user._id;
    dispatch(fetchCartItems(userId));
  }, [data, dispatch, router, status]);

  const handleOnRemoveCartItem = async (productId) => {
    const userId = data?.user._id;
    dispatch(removeItemFromCart(userId, productId));
  };

  return (
    <RootLayout title="Cart">
      <h1 className="px-16 pt-20">cart</h1>
      <div className="grid grid-cols-12 gap-10 px-14 py-5">
        <div
          className={`col-span-8 max-h-[400px] overflow-y-auto rounded-md bg-accent px-3 pb-2 text-neutral`}
        >
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex w-full items-center justify-between border-b border-neutral py-5"
              >
                <ProductImage circle src={item.image} width={60} />
                <div className="min-w-[2rem] text-center">{item.quantity}</div>
                <div className="min-w-[12rem] text-center">
                  {toRupiah(item.price)}
                </div>
                <div
                  className="min-w-[2rem] cursor-pointer rounded-full p-2 text-center font-extrabold hover:bg-neutral hover:text-accent"
                  onClick={() => handleOnRemoveCartItem(item._id)}
                >
                  <RxCross1 />
                </div>
              </div>
            ))
          ) : !loading && cartItems.length === 0 ? (
            <div className="my-14 text-center text-4xl font-bold tracking-wide">
              Cart is Empty
            </div>
          ) : (
            <div className="flex flex-col gap-1 py-3">
              <SkeletonTheme
                baseColor=" #D3D3D3"
                highlightColor="#808080"
                duration={2}
              >
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
              </SkeletonTheme>
            </div>
          )}
        </div>

        <div className="col-span-4 rounded-md text-neutral">
          <div className="w-full rounded-md bg-accent p-5">
            <h2 className="text-lg font-bold capitalize">Payment Detail</h2>
            <hr className="my-3 border-neutral" />
            <span className="mb-3 flex justify-between">
              Total Price : <p>{toRupiah(totalPrice)}</p>
            </span>
            <CheckoutBtn
              cartItems={cartItems}
              userId={data?.user._id}
              loading={loading}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Cart;
