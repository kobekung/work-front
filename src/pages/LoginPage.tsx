import { useState } from "react";
import bgImg from "../assets/img/bg1.jpg";
import { BiHide, BiShow } from "react-icons/bi";
import myImage from "../../public/MEA_logo.png";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../utils/Alert";
import { useForm } from "react-hook-form";
import { AuthenApi } from "../services/AuthenAPI";

export interface ILogin {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const navigate = useNavigate();
  const onSubmit = async (data: ILogin) => {
    try {
      const result = await AuthenApi.Login(data);
      await localStorage.setItem("token", result.token);
      alertSuccess();
      navigate("/manage-user", { replace: true });
    } catch (e: any) {
      alertError(e.response.data.message);
      throw e;
    }
    // Handle form submission here, e.g., send data to the server
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen bg-[#10182e] items-center justify-center">
      <div className="flex rounded-lg lg:h-5/6 w-3/4 bg-white">
        <div
          className="w-0 lg:w-1/2 bg-cover bg-center rounded-l-lg"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full lg:w-3/4">
            <div className="flex items-center mb-5 justify-center">
              <img src={myImage} className="h-10 md:h-20 mr-3" />
              <p className="self-center text-3xl md:text-4xl font-semibold whitespace-nowrap">
                CEP
              </p>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="username" className="block font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-red-500">Username is required</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border rounded-md pr-10"
                    {...register("password", { required: true })}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500">Password is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
