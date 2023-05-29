import AddToCartBtn from "@components/UI/atoms/AddToCartBtn";
import ProductImage from "@components/UI/atoms/ProductImage";
import ProductSkeleton from "@components/UI/atoms/Skeleton/ProductSkeleton";
import RootLayout from "@components/UI/templates/RootLayout";
import Link from "next/link";

import { useEffect } from "react";
import { toRupiah, toTitleCase } from "@lib/textFunction";
import { getAllProducts } from "@store/actions/productAction";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import SideCart from "@components/products/organism/SideCart";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <RootLayout title="Products">
      <div className="min-h-screen px-10 pt-24 ">
        <div className="flex items-center justify-between font-semibold">
          <p className="text-lg">Showing all results</p>
          <div className="flex items-center justify-center gap-10 border-b-2 border-accent  px-3 pb-2 font-semibold">
            Default sorting <BsChevronDown className="mt-1" />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-3 justify-items-center pt-16 pb-10">
          {loading ? (
            <ProductSkeleton counts={3} />
          ) : (
            products.data?.map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer space-y-2 duration-300 hover:-translate-y-4"
              >
                <div className="group relative h-[350px] w-[350px] overflow-hidden rounded-md">
                  <ProductImage src={product.image} width={350} />
                  <AddToCartBtn btnDefault={false} id={product._id} />
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    {toTitleCase(product.name)}
                  </p>
                  <p className="pb-3 text-lg text-accent">
                    {toRupiah(product.price)}
                  </p>
                  <Link href={`/products/${product._id}`}>
                    <button className="w-full -translate-y-5 rounded-sm border bg-secondary py-3 font-bold text-neutral opacity-0 duration-300 hover:border-secondary hover:bg-white hover:text-secondary group-hover:translate-y-0 group-hover:opacity-100">
                      Show Detail
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        {/* End Products */}

        {/* Cart Side */}
        <SideCart />
        {/* End Cart Side */}
      </div>
    </RootLayout>
  );
};

export default Products;
