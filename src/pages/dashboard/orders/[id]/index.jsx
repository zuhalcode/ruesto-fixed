import DashboardLayout from "@components/dashboard/templates/DashboardLayout";
import axiosClient from "@lib/axios";
import { toRupiah, toTitleCase } from "@lib/textFunction";
import Toast from "@lib/toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OrderDetail = () => {
  const [order, setOrder] = useState();

  const router = useRouter();
  const { data } = useSession();

  const orderId = router.query.id;

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axiosClient.get(`/api/order/${orderId}`);
      setOrder(res.data.data);
    };
    if (orderId) fetchOrder();
  }, [orderId, router]);

  const handleOnCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this payment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .delete(`/api/order/${orderId}/delete`)
          .then(
            Swal.fire("Payment cancelled!", "", "success").then(() =>
              router.push("/dashboard/orders")
            )
          )
          .catch((e) => console.log(e));
      }
    });
  };

  const handleOnPay = async () => {
    try {
      const userId = data?.user._id;

      const res = await axiosClient.post(`/api/users/${userId}/cart/checkout`, {
        orderId: order._id, // Use the order ID from MongoDB
        firstName: toTitleCase(data?.user.name),
        lastName: "",
        amount: order.total,
        email: data?.user.email,
        phone: "085222333444",
      });

      const transactionToken = res.data.transactionToken;

      window.snap.pay(transactionToken, {
        onSuccess: (res) => {
          /* You may add your own implementation here */
          Toast({ type: "success", message: "Transaksi sukses" });
          console.log(res);
        },
        onPending: async (res) => {
          /* You may add your own implementation here */
          const resOrder = await axiosClient.put(
            `/api/order/${orderId}/update`,
            { status: "processing" }
          );

          const resPayment = await axiosClient.post(
            `/api/users/${userId}/payment/create`,
            res
          );

          Toast({ type: "success", message: res.status_message });
          router.push("/dashboard/orders");
        },
        onError: (res) => {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(res);
        },
        onClose: () => {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout head="Order Detail">
      <div className="max-h-[495px] w-full overflow-y-auto ">
        <div className="w-full rounded-lg bg-white p-7">
          {/* Header */}
          <div className="flex w-full justify-between">
            <div className="flex items-center justify-center gap-3">
              <Image src="/img/ruesto-logo.png" alt="" width={50} height={50} />
              <div>
                <h2 className="text-lg font-bold">Ruesto</h2>
                <p className="text-slate-500">ruesto@gmail.com</p>
              </div>
            </div>
            <div className="text-right capitalize text-slate-500">
              <p className="">ijen boulevard street 101</p>
              <p className="">Malang city, 65115</p>
              <p className="">east java, Indonesia</p>
            </div>
          </div>
          {/* End Header */}

          {/* Invoice */}
          <div className="mt-5 flex w-full justify-between rounded-lg bg-accent p-7 ">
            <div className="capitalize text-neutral">
              <h2 className="font-semibold">Invoice Number</h2>
              <h2 className="">INV-2002-0100</h2>
              <span className="flex gap-2">
                Issued Date : <p className="">11 Jan 2022</p>
              </span>
              <span className="flex gap-2">
                Due Date : <p className="">11 Jan 2022</p>
              </span>
            </div>
            <div className="text-right capitalize text-neutral">
              <h2 className="font-semibold">Billed to</h2>
              <h2 className="">Zacky Grizzly</h2>
              <h2 className="">Moonlight Agency Ltd</h2>
              <h2 className="">New York, USA</h2>
            </div>
          </div>
          {/* End Invoice */}

          {/* Item Details */}
          <div className="mt-3 space-y-3">
            <p className="text-lg font-semibold">Item Details</p>
            <table className="min-w-full divide-y divide-slate-500 font-medium text-accent">
              <thead className="border-t border-slate-500">
                <tr className="text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  <th scope="col" className="px-6 py-3">
                    Item name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white text-center">
                {order?.items.map((item) => (
                  <tr key={item.product}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {toTitleCase(item.name)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {item.quantity}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {toRupiah(item.price)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {toRupiah(item.quantity * item.price)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          {/* End Item Details */}

          {/* Payment And Subtotal */}
          <div className="my-5 flex justify-between">
            <div className="w-1/3 space-y-2">
              <div className="flex justify-between">
                <h2 className="font-semibold">Payment Method</h2>
                <p className="text-sm font-medium text-blue-600">
                  Select Payment
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 capitalize">
                <p className="mb-3 font-semibold text-accent">Wire transfer</p>
                <span className="flex gap-2 text-slate-500">
                  Account Name :
                  <p className="font-medium text-accent">barly vandelio</p>
                </span>
                <span className="flex gap-2 text-slate-500">
                  Account Number :
                  <p className="font-medium text-accent">9700 0023 4200 2900</p>
                </span>
                <span className="flex gap-2 text-slate-500">
                  Routing Number :
                  <p className="font-medium text-accent">085234673562</p>
                </span>
              </div>
            </div>

            <div className="w-1/3 space-y-3 font-semibold text-accent">
              <span className="flex justify-between gap-2 ">
                Subtotal
                <p className="text-accent">{toRupiah(order?.total || 0)}</p>
              </span>
              <span className="flex justify-between gap-2">
                Discount <p className="text-accent">{toRupiah(0 || 0)}</p>
              </span>
              <span className="flex justify-between gap-2">
                Total tax <p className="text-accent">{toRupiah(5000 || 0)}</p>
              </span>
              <hr />
              <span className="flex justify-between gap-2 font-bold text-accent">
                Total Amount <p className="">{toRupiah(order?.total + 5000)}</p>
              </span>
              {order?.status === "pending" && (
                <div className="space-y-1">
                  <button
                    className="w-full rounded-sm border border-green-500 bg-white p-2 text-green-500 hover:bg-green-500 hover:text-neutral"
                    onClick={handleOnPay}
                  >
                    Pay
                  </button>
                  <button
                    className="hover: w-full rounded-sm border border-secondary p-2 text-secondary hover:bg-secondary hover:text-neutral"
                    onClick={handleOnCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* End Payment And Subtotal */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetail;
