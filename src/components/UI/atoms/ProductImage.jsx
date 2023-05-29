import Image from "next/image";

const ProductImage = ({ src = "", width = 500, circle = false }) => {
  return (
    <div
      className={`relative overflow-hidden ${
        circle ? "rounded-full" : "rounded-md"
      }`}
      style={{ height: width, width: width }}
    >
      <div className="relative h-full w-full">
        <Image
          src={src || "/img/ss.png"}
          alt=""
          fill // menempatkan gambar ke dalam kotak
          style={{ objectFit: "cover" }} // memotong gambar agar pas di dalam kotak
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px" // specify available sizes
          priority
        />
      </div>
    </div>
  );
};

export default ProductImage;
