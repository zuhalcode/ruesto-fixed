import axiosClient from "@lib/axios";
import Toast from "@lib/toast";
import { fetchCartItems } from "@store/actions/cartAction";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

const CheckoutBtn = ({ cartItems, userId, loading, totalPrice }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnCheckout = async () => {
    try {
      const res = await axiosClient.post(`/api/order/create`, {
        user: userId,
        items: cartItems,
        total: totalPrice,
      });

      Toast({ type: "success", message: res.data.message, timer: 1500 }).then(
        () => {
          dispatch(fetchCartItems());
          router.push("/dashboard/order");
        }
      );
    } catch (error) {
      console.error(error); // handle any error here
    }
  };

  return (
    <button
      disabled={loading || cartItems.length === 0}
      className={`w-full rounded-sm bg-neutral py-2 font-semibold uppercase text-accent duration-100 hover:border hover:border-neutral hover:bg-accent hover:text-neutral`}
      onClick={handleOnCheckout}
    >
      {loading ? <Loading className="mt-0" /> : "Checkout"}
    </button>
  );
};

export default CheckoutBtn;
