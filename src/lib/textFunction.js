export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const toTitleCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const toRupiah = (number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    number
  );
