import Button from "@components/UI/atoms/Button";
import Input from "@components/UI/atoms/Input";
import Loading from "@components/UI/atoms/Loading";
import AuthLayout from "@components/auth/templates/AuthLayout";
import axiosClient from "@lib/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "@components/UI/organisms/Navbar";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosClient.post("/api/auth/register", state);
      if (res.error) console.log("error", res.error);
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <AuthLayout head="Register Page">
        <form
          className="flex flex-col items-start justify-start space-y-5 px-5 pt-24"
          onSubmit={handleOnSubmit}
        >
          <p className="text-2xl font-semibold">Create an Account</p>

          <Input
            name="name"
            placeholder="Name"
            value={state.name}
            handleOnChange={handleOnChange}
            className="border-b"
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            handleOnChange={handleOnChange}
            className="border-b"
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            handleOnChange={handleOnChange}
            className="border-b"
          />
          {loading ? (
            <Loading />
          ) : (
            <Button size="sm" className="mx-auto mt-3 w-full">
              Create Account
            </Button>
          )}

          <div className="mx-auto mt-5 flex gap-1 text-center text-sm">
            Already have an account ?
            <Link
              href="/auth/login"
              className="cursor-pointer underline underline-offset-2 hover:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
