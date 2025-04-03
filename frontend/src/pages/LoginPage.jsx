import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import loginImg from "../assets/shopping-time.jpg"
import Swal from "sweetalert2";
import api from "../config/api";

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = {
      email, 
      password
    }

    try {
      const res = await api.post("/api/user/login", data)
      const resData = res.data
      localStorage.setItem("user", JSON.stringify(resData))
      localStorage.setItem("token", resData.token)
      Swal.fire({
        title: "Welcome back",
        text: "You have successfully login",
        icon: "success"
      })
      navigate("/checkout")
    } catch (error) {
      console.error(error.message)
      Swal.fire({
        title: "☠️",
        text: "Unable to log user in! check credentials",
        icon: "error"
      })
    }
  }
  return (
    <div className="flex flex-col items-center mx-auto w-full mt-12 p-2 lg:mt-24">
      <div className="flex w-full  lg:max-w-[800px]">
        <div className="w-full hidden lg:block">
          <img src={loginImg} alt="" className="rounded-l-xl " />
        </div>
        <div className="w-full bg-gradient-to-r rounded-l-xl from-purple-300 to-blue-300 rounded-r-xl lg:rounded-l-none">
          <form onSubmit={handleLogin} className="w-full h-full space-y-4 p-4 lg:p-6">
            <div className="flex mb-4 w-full items-center justify-center bg-transparent">
              <h1 className="text-3xl font-bold  bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                Login
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@email.com"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="" className="text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password here"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex items-center w-full px-4 py-1 cursor-pointer rounded-full justify-center mx-auto bg-purple-500 text-lg font-semibold text-white hover:bg-purple-700">
              <button>Login</button>
            </div>

            <div className="flex text-sm items-end justify-end">
              <p>
               Doesn't have an account, please{" "}
                <Link
                  to="/register"
                  className="inline-block text-blue-900 underline font-semibold cursor-pointer transform transition-transform hover:scale-110"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;