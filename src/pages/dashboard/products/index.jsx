import Button from "@components/UI/atoms/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/dashboard/templates/DashboardLayout";
import axiosClient from "@lib/axios";
import { toRupiah, toTitleCase } from "@lib/textFunction";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { RxCross2 } from "react-icons/rx";
import CornerDeleteX from "@components/UI/atoms/CornerDeleteX";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      const res = await axiosClient.get("/api/products");
      setProducts(res.data.data);
    };
    fetchProducts();

    setLoading(false);
  }, []);

  return (
    <DashboardLayout title="Products">
      <Link
        href="/dashboard/products/create"
        target="_blank"
        className={`relative z-20 rounded-md bg-blue-500 px-3 py-2 text-white`}
      >
        <span>Add Products</span>
      </Link>

      <div className="mt-5 grid grid-cols-4 gap-3">
        {loading ? (
          <>
            <SkeletonTheme
              baseColor="#808080"
              highlightColor="#D3D3D3"
              duration={2}
            >
              {Array.from({ length: 8 }, (v, i) => (
                <div className="w-full" key={i}>
                  <Skeleton className="h-52 w-full" />
                  <Skeleton className="my-2 h-8 w-full" />
                  <div className="-mt-[.5rem] flex flex-col -space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </SkeletonTheme>
          </>
        ) : (
          products.map((product) => (
            <div key={product._id} className="rounded-b-sm bg-white pb-3">
              <div className={`group relative h-52 w-full overflow-hidden`}>
                <CornerDeleteX productId={product._id} />
                <div className="relative h-full w-full">
                  <Image
                    src={`${product.image}` || "/img/ss.png"}
                    alt=""
                    fill // menempatkan gambar ke dalam kotak
                    style={{ objectFit: "cover" }} // memotong gambar agar pas di dalam kotak
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px" // specify available sizes
                    priority
                  />
                </div>
              </div>
              <p className="my-2 text-center text-base font-bold uppercase">
                {toTitleCase(product.name)}
              </p>
              <p className="mx-auto w-[95%] overflow-hidden whitespace-nowrap text-center text-sm font-semibold text-slate-600">
                {product.desc.length > 10
                  ? `${product.desc.slice(0, 30)} ...`
                  : product.desc}
              </p>

              <p className="my-2 px-2 text-center text-xl font-semibold">
                {toRupiah(product.price)}
              </p>

              <Button
                className="mx-auto flex w-[92%] items-center justify-center"
                handleOnClick={() =>
                  router.push(`/dashboard/products/${product._id}`)
                }
              >
                <p className="text-sm">Product Details</p>
              </Button>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
