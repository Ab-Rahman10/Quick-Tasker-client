import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password).then((result) =>
        console.log("login successful!")
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Google sign in
  const handleGoogleSignIn = () => {
    googleSignIn();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-green-500">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Login to access your dashboard
        </p>
        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              {...register("email")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Password Input */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center justify-center mt-6">
          <div className="w-full h-px bg-gray-300"></div>
          <p className="mx-3 text-sm text-gray-500">OR</p>
          <div className="w-full h-px bg-gray-300"></div>
        </div>
        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full mt-4 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
