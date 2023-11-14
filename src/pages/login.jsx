import axios from "@lib/axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadCustom from "../layout/AdminLayout/Header/head";
import ToastComp from "../components/Toast/Toast";
import {useAuth} from "@hooks/auth"

const Login = () => {
  const router = useRouter();

  const [status, setStatus] = useState("");
  const { login } = useAuth({
    middleware: "guest",
    status,
    redirectIfAuthenticated: "/",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

  // useEffect(() => {
  //   if (router.query.reset?.length > 0 && errors.length === 0) {
  //     setStatus(atob(router.query.reset));
  //     console.log(status)
  //   } else {
  //     if (status === "success")
  //     setStatus("failed");
  //   }
  // }, [router.query.reset, errors]);

  const submitForm = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("/login", formData)
      .then((response) => {
        console.log("Login Berhasil");
        setToast({
          show: true,
          message: "Login Berhasil ",
          success: true,
        });
        setTimeout(() => {
          setToast(false);
          router.push("/");
        }, 1000);
      })
      .catch((error) => {
        console.log("Login Gagal");
        setToast({
          show: true,
          message: "Login Gagal",
          success: false,
        });
        setTimeout(() => {
          setToast(false);
        }, 1000);
      });
  };

  return (
    <>
      <HeadCustom title={"Login"} />
      <div className="flex justify-center items-center h-screen border font-sans">
        <div className="w-full h-full">
          <div className=" min-h-screen flex items-center justify-center py-2  bg-orangePrimary">
            <div className="bg-white border-white border box-border p-8 w-1/3  rounded-3xl shadow-lg opacity-85 ">
              <div className="justify-center flex">
                <img
                  src="assets/img/logo_kelurahan.png"
                  alt="Logo"
                  className=" top-0 right-0 mt-2 mr-4 h-28 w-auto justify-center flex items-center"
                />
              </div>

              <h2 className="text-2xl font-bold text-black justify-center flex text-right mt-5 mb-10 ">
                Welcome Back!
              </h2>

              <form onSubmit={submitForm}>
                <div className="mb-4 mt-2">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-semibold  "
                  >
                    Email address:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 font-semibold"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="text-center mb-5 ">
                  <button
                    type="submit"
                    className="bg-orange-400 text-white px-4 py-2 font-semibold rounded-md w-full transition-colors duration-300 ease-in-out hover:bg-orange-500 active:bg-orange-600 hover:text-black"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {toast.show && <ToastComp message={toast.message} success={toast.success} />}
    </>
  );
};

export default Login;
