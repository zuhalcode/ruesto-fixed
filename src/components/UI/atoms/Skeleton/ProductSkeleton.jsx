import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = ({ counts }) => {
  return (
    <SkeletonTheme baseColor=" #808080" highlightColor="#D3D3D3" duration={2}>
      {Array.from({ length: counts }, (v, i) => (
        <div key={i} className="flex flex-col gap-1">
          <Skeleton width={350} height={350} />
          <Skeleton height={40} />
          <Skeleton height={20} />
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default ProductSkeleton;
