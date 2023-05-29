/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import Button from "@components/UI/atoms/Button";
import DashboardLayout from "@components/dashboard/templates/DashboardLayout";
import axiosClient from "@lib/axios";
import { useRouter } from "next/router";
import ProductImage from "@components/UI/atoms/ProductImage";
import { toRupiah, toTitleCase } from "@lib/textFunction";

export default function Page() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const productId = router.query.id;

  useEffect(() => {
    const fetchProducts = async () => {
      if (productId) {
        const { data } = await axiosClient.get(`/api/products/${productId}`);
        setProduct(data.data);
      }
    };
    fetchProducts();
  }, [productId, router]);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <ProductImage src={product?.image} />
          <div className="flex w-full items-center justify-center gap-1 bg-white p-1">
            <img src={product?.image} alt="" className="w-20" />
            <img src={product?.image} alt="" className="w-20" />
          </div>
        </div>
        <div className="h-fit space-y-4 bg-white p-2">
          <div>
            <p className="flex flex-col text-2xl font-bold capitalize">
              {product?.name}
            </p>
            <p className="text-sm font-medium text-slate-400">
              with Garlic Onion
            </p>
          </div>
          <div className="m-2 flex items-center">
            <BsFillStarFill className="text-yellow-500" />
            <BsFillStarFill className="text-yellow-500" />
            <BsFillStarFill className="text-yellow-500" />
            <BsFillStarFill className="text-yellow-500" />
            <AiOutlineStar className="text-[18px] text-slate-400" />
            <p className="mx-3">(45)</p>
          </div>
          <p className="m-2">{product?.desc}</p>
          <div className="m-2 flex space-x-10">
            <p className="text-xl font-semibold text-slate-500">Price</p>
            <p className="text-xl font-bold">{toRupiah(product?.price)}</p>
          </div>
          <Button
            className="w-full"
            handleOnClick={() =>
              router.push(`/dashboard/products/${productId}/edit`)
            }
          >
            Edit Product
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
