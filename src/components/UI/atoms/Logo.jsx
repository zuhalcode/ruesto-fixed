import Image from "next/image";
import Link from "next/link";

const Logo = ({ className = "", mode = "dark", size = "xl" }) => {
  return (
    <Link href="/">
      <div
        className={`flex w-fit items-center justify-center rounded-sm px-3 py-2 text-center sm:p-3 ${className}`}
      >
        <Image
          src="/img/ruesto-logo.png"
          alt=""
          width={size === "xl" ? 48 : 32}
          height={size === "xl" ? 56 : 40}
        />
        <p
          className={`mt-2 font-berkshire ${
            size === "xl" ? "text-3xl" : "text-xl"
          } font-semibold uppercase tracking-wide ${
            mode === "dark" ? "text-accent" : "text-neutral"
          }`}
        >
          Ruesto
        </p>
      </div>
    </Link>
  );
};

export default Logo;
