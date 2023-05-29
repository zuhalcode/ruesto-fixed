import Button from "@components/UI/atoms/Button";
import Input from "@components/UI/atoms/Input";
import AuthLayout from "@components/auth/templates/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Loading from "@components/UI/atoms/Loading";
import { useEffect, useState } from "react";
import Navbar from "@components/UI/organisms/Navbar";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  const [state, setState] = useState({
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
      const res = await signIn("credentials", {
        email: state.email,
        password: state.password,
        redirect: false,
      });
      if (res.error) console.log("error", res.error);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [router, status]);

  return (
    <>
      <Navbar />
      <AuthLayout head="Login Page">
        <form
          className="flex flex-col items-center justify-center px-5 pt-24"
          onSubmit={handleOnSubmit}
        >
          <p className="text-2xl font-semibold">Welcome Back</p>

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            handleOnChange={handleOnChange}
            className="mb-1 border-b"
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            handleOnChange={handleOnChange}
            className="mb-1 border-b"
          />

          <Link
            href="/auth/login"
            className="cursor-pointer self-end text-xs underline underline-offset-2 hover:text-blue-500"
          >
            Forgot Password
          </Link>

          {loading ? (
            <Loading />
          ) : (
            <Button size="sm" className="mx-auto mt-3 w-full">
              Login
            </Button>
          )}

          <div className="mx-auto mt-3 flex gap-1 text-center text-sm">
            Don&apos;t have an account ?
            <Link
              href="/auth/register"
              className="cursor-pointer underline underline-offset-2 hover:text-blue-500"
            >
              Register
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
