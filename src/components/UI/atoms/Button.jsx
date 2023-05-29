export default function Button({
  children,
  className = "",
  handleOnClick = () => {},
  size = "md",
}) {
  return (
    <button
      className={`rounded-md bg-blue-500 ${
        size === "md" ? "px-5 py-3" : size === "sm" && "px-3 py-2 text-sm"
      }  text-white ${className}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
