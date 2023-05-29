import Tab from "@components/products/atoms/Tab";
import AddToCartBtn from "@components/UI/atoms/AddToCartBtn";
import ProductImage from "@components/UI/atoms/ProductImage";
import RootLayout from "@components/UI/templates/RootLayout";
import axiosClient from "@lib/axios";

import { toRupiah } from "@lib/textFunction";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductDetail = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = router.query.id;
        if (productId) {
          const res = await axiosClient.get(`/api/products/${productId}`);
          const productData = res.data;
          setProduct(productData.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [router]);

  return (
    <RootLayout>
      <div className="mt-20 grid min-h-screen grid-cols-2 bg-neutral p-10">
        {product ? (
          <>
            <ProductImage src={product.image} width={550} />
            <div className="space-y-5">
              <div className="space-y-2">
                <h1 className="text-4xl tracking-wide">{product.name}</h1>
                <p className="text-2xl">{toRupiah(product.price)}</p>
              </div>
              <p className="text-justify">{product.desc}</p>
              <AddToCartBtn />
            </div>
          </>
        ) : (
          <>
            <SkeletonTheme
              baseColor=" #808080"
              highlightColor="#D3D3D3"
              duration={2}
            >
              <Skeleton width={550} height={550} />
            </SkeletonTheme>
            <SkeletonTheme
              baseColor=" #808080"
              highlightColor="#D3D3D3"
              duration={2}
            >
              <div className="flex flex-col gap-3">
                <Skeleton width={550} height={40} />
                <Skeleton width={550} height={30} />
                <Skeleton width={550} height={300} />
                <Skeleton width={550} height={30} />
              </div>
            </SkeletonTheme>
          </>
        )}
      </div>
      <div className="min-h-screen bg-neutral px-10">
        <Tab>
          <Tab.Panel title="Description">
            <div className="px-5 py-3 text-center text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              dolorem cumque ad. Consectetur amet nam repudiandae, nulla dolore
              facere in.
            </div>
          </Tab.Panel>
          <Tab.Panel title="Additional Information" width={320} left={295}>
            <div className="px-5 py-3 text-center text-base">
              Additional Information
            </div>
          </Tab.Panel>
          <Tab.Panel title="Reviews (3)" width={250} left={646}>
            <div className="px-5 py-3 text-center text-base">Reviews (3)</div>
          </Tab.Panel>
        </Tab>
      </div>
    </RootLayout>
  );
};

export default ProductDetail;
