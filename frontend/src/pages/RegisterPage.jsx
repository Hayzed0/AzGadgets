import React, { useState } from "react";
import registerImg from "../assets/funny.jpg"
import  { Link, useNavigate } from "react-router"
import api from "../config/api"
import Swal from "sweetalert2"
const RegisterPage = () => {
  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")

  const navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault()
    const data = {
      name, email, password
    }

    try {
      const res = await api.post("/api/user/register", data)
      const resData = res.data 
        localStorage.setItem("user", JSON.stringify(resData))
        localStorage.setItem("token", resData.token)
        Swal.fire({
          icon: "Success",
          title: "😮",
          text: "Registration Successful!!"
        })
        navigate("/checkout")
        setName("")
        setEmail("")
        setPassword("")

    } catch (error) {
      console.error(error.message)
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong whilst trying to sign up"
      })
    }
  }

  return (
    <div className="flex flex-col items-center mx-auto w-full mt-12 p-4 lg:mt-24">
      <div className="flex w-full  lg:max-w-[800px]">
        <div className="w-full hidden lg:block">
          <img src={registerImg} alt="" className="rounded-l-xl" />
        </div>
        <div className="w-full bg-gradient-to-r rounded-l-xl from-purple-300 to-blue-300 rounded-r-xl lg:rounded-l-none">
          <form onSubmit={handleRegistration} className="w-full h-full space-y-4 p-4 lg:p-6">
            <div className="flex mb-4 w-full items-center justify-center bg-transparent">
              <h1 className="text-3xl font-bold  bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                Register
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="" className="text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your full name"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password here"
                className="py-1 px-2 rounded-md outline-none focus:ring-1 focus:ring-purple-700 ring ring-purple-100"
              />
            </div>
            <div className="flex items-center w-full px-4 py-1 cursor-pointer rounded-full justify-center mx-auto bg-purple-500 text-lg font-semibold text-white hover:bg-purple-700">
              <button>Register</button>
            </div>

            <div className="flex text-sm items-end justify-end">
              <p>Already have an account, please <Link to="/login" className="inline-block text-blue-900 underline font-semibold cursor-pointer transform transition-transform hover:scale-110">login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;