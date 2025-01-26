import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";
import { Link, useNavigate } from "react-router-dom";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_HOSTING_KEY
}`;
const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, userProfileUpdate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // hosting image in imgbb------
    const imageFile = { image: data.photo[0] };
    const { data: imageData } = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    try {
      // Create a user----------
      await createUser(data.email, data.password).then((result) =>
        console.log("Signed up")
      );
      navigate("/");
      // update profile---------
      await userProfileUpdate(data.name, imageData.data.display_url);
      console.log("Profile Updated");
      toast.success("Registration Successful! Welcome to QuickTaster.");
    } catch (err) {
      console.log(err);
      toast.error(
        "Registration Failed! Please check your details and try again."
      );
    }

    // store user info in the database
    const coins = data.role === "worker" ? 10 : 50;
    const userInfo = {
      name: data.name,
      email: data.email,
      role: data.role,
      image: imageData.data.display_url,
      availableCoins: coins,
    };

    const res = await axiosPublic.post("/users", userInfo);
    if (res.data.insertedId) {
      toast.success("Account created successfully!");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-green-500">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Register to access your dashboard
        </p>
        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* image Input */}
          <div className="mt-4">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Photo
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.photo ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {errors.photo && (
              <p className="mt-1 text-sm text-red-500">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
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
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number",
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
          {/* Role Selection */}
          <div className="mt-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Select Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>
          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-5">
          Already have an account?{" "}
          <span className="underline text-green-500">
            <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
