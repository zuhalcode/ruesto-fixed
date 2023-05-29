import Button from "@components/UI/atoms/Button";
import Input from "@components/UI/atoms/Input";
import DashboardLayout from "@components/dashboard/templates/DashboardLayout";
import React, { useRef, useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";
import axiosClient from "@lib/axios";
import Toast from "@lib/toast";
import Loading from "@components/UI/atoms/Loading";

export default function AddProduct() {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("No Selected File");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    category: "",
    desc: "",
    price: "",
  });

  const handleOnChange = (e) => {
    e.target.name === "price" && isNaN(e.target.value)
      ? e.preventDefault()
      : setData({
          ...data,
          [e.target.name]: e.target.value,
        });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name.toLowerCase());
    formData.append("category", data.category.toLowerCase());
    formData.append("price", data.price);
    formData.append("desc", data.desc.toLowerCase());
    formData.append("image", imageRef.current.files[0]);

    try {
      const { data } = await axiosClient.post(
        "/api/products/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Toast({ type: "success", timer: 2000, message: data.message })
        .then(() => {
          setData({
            name: "",
            category: "",
            desc: "",
            price: "",
          });
          setImage(null);
          setFilename("No Selected File");
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <form className="grid grid-cols-2 gap-5" onSubmit={handleOnSubmit}>
        <div className="space-y-2">
          <p className="text-2xl font-bold uppercase">Add Product</p>

          <Input
            name="name"
            placeholder="Name"
            value={data.name}
            handleOnChange={handleOnChange}
          />

          <Input
            name="price"
            placeholder="Price"
            value={data.price}
            handleOnChange={handleOnChange}
          />

          <Input
            name="category"
            placeholder="Category"
            value={data.category}
            handleOnChange={handleOnChange}
          />

          <div
            className="flex h-1/2 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-500"
            onClick={() => imageRef.current.click()}
          >
            <input
              ref={imageRef}
              type="file"
              name="image"
              placeholder="Upload Image"
              accept="image/*"
              hidden
              onChange={({ target: { files } }) => {
                if (files) {
                  setImage(URL.createObjectURL(files[0]));
                  setFilename(files[0].name);
                }
              }}
            />

            {image ? (
              <Image
                width="80"
                height="80"
                src={image}
                className="h-[80%] w-[80%]"
                alt=""
              />
            ) : (
              <>
                <MdCloudUpload className="text-7xl text-blue-500" />
                <p className="text-sm font-semibold">Browse Files to Upload</p>
              </>
            )}
          </div>

          <section className="flex items-center space-x-1">
            <AiFillFileImage className="text-lg text-blue-500" />
            <p className="text-sm">{filename}</p>
          </section>
          {loading ? (
            <div className="w-1/3 ">
              <Loading />
            </div>
          ) : (
            <Button size="sm" className="mt-3">
              Add Product
            </Button>
          )}
        </div>

        <div>
          <p className="text-2xl font-bold uppercase">Description</p>
          <textarea
            placeholder="Description"
            className="mt-3 px-3 pt-2 outline-blue-500 "
            name="desc"
            cols="60"
            rows="10"
            value={data.desc}
            onChange={handleOnChange}
          ></textarea>
        </div>
      </form>
    </DashboardLayout>
  );
}
