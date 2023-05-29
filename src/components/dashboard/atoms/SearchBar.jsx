import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className=" mx-7 flex w-[30%] space-x-2 rounded-md bg-white p-2">
      <BiSearch className="mx-2 mt-2 text-2xl text-d-accent" />
      <input
        type="text"
        className="w-full bg-transparent text-d-accent outline-none placeholder:text-d-accent"
        placeholder="Search for transaction, item, etc"
      />
    </div>
  );
}
