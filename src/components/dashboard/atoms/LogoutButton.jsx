import { clearCart } from "@store/slices/cartSlice";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    signOut();
  };

  return (
    <li className="flex w-full justify-center" onClick={handleLogout}>
      <button className="flex w-[80%] items-center space-x-5 rounded-md py-3 pl-1">
        <FiLogOut />
        <p className="text-sm uppercase">Logout</p>
      </button>
    </li>
  );
}
