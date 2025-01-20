import { useForm } from "react-hook-form";
import { FaPlusCircle, FaCoins, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { compareAsc, format } from "date-fns";
import toast from "react-hot-toast";
import useGetUserCoins from "../../../Hooks/useGetUserCoins";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_HOSTING_KEY
}`;
const AddNewTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completionDate, setCompletionDate] = useState(new Date());
  const [coins, isLoading, refetch] = useGetUserCoins();
  const axiosSecure = useAxiosSecure();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.completionDate = completionDate;

    // Validation
    const result = compareAsc(new Date(), new Date(completionDate));
    if (result === 1) {
      toast.error("The completion date must be in the future");
      return;
    }

    const totalPayableAmount = data.requiredWorkers * data.payableAmount;
    if (totalPayableAmount > coins) {
      toast.error("Not enough coins. Please Purchase Coins.");
      navigate("/dashboard/purchase-coin");
      return;
    }

    if (data.requiredWorkers <= 0) {
      toast.error("Please assign at least one worker to this task.");
      return;
    }
    if (data.payableAmount <= 0) {
      toast.error("Task must have a positive payable amount..");
      return;
    }

    // send to db
    // hosting image in imgbb------
    const imageFile = { image: data.taskImageUrl[0] };
    const { data: imageData } = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const taskData = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      title: data.taskTitle,
      detail: data.taskDetail,
      required_workers: parseInt(data.requiredWorkers),
      payable_amount: parseInt(data.payableAmount),
      completion_date: completionDate,
      submission_info: data.submissionInfo,
      task_image: imageData.data.display_url,
    };

    if (imageData.success) {
      try {
        const { data } = await axiosSecure.post("/task", taskData);
        console.log(data);
        toast.success("Task added successfully!");
        refetch();
        navigate("/dashboard/my-tasks");
      } catch (err) {
        console.log("Task data store problem", err);
      }
    }

    // After saving the task, reduce the user's coin
    // updateUserCoins(coins - totalPayableAmount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Title */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700" htmlFor="taskTitle">
              Task Title
            </label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="text"
                id="taskTitle"
                placeholder="Task title"
                className="flex-1 outline-none p-2 text-gray-800"
                {...register("taskTitle", {
                  required: "Task title is required",
                })}
              />
              <FaPlusCircle className="text-green-500 ml-2" />
            </div>
            {errors.taskTitle && (
              <span className="text-red-500 text-sm">
                {errors.taskTitle.message}
              </span>
            )}
          </div>

          {/* Task Detail */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700" htmlFor="taskDetail">
              Task Detail
            </label>
            <textarea
              id="taskDetail"
              placeholder="Detail description of the task"
              className="p-2 border border-gray-300 rounded-md"
              rows="4"
              {...register("taskDetail", {
                required: "Task detail is required",
              })}
            />
            {errors.taskDetail && (
              <span className="text-red-500 text-sm">
                {errors.taskDetail.message}
              </span>
            )}
          </div>

          {/* Required Workers */}
          <div className="flex flex-col">
            <label
              className="font-semibold text-gray-700"
              htmlFor="requiredWorkers"
            >
              Required Workers
            </label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="number"
                id="requiredWorkers"
                placeholder="Number of workers needed"
                className="flex-1 outline-none p-2 text-gray-800"
                {...register("requiredWorkers", {
                  required: "This field is required",
                })}
              />
            </div>
            {errors.requiredWorkers && (
              <span className="text-red-500 text-sm">
                {errors.requiredWorkers.message}
              </span>
            )}
          </div>

          {/* Payable Amount */}
          <div className="flex flex-col">
            <label
              className="font-semibold text-gray-700"
              htmlFor="payableAmount"
            >
              Payable Amount (per worker)
            </label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="number"
                id="payableAmount"
                placeholder="Amount to pay each worker"
                className="flex-1 outline-none p-2 text-gray-800"
                {...register("payableAmount", {
                  required: "Payable amount is required",
                })}
              />
              <FaCoins className="text-green-500 ml-2" />
            </div>
            {errors.payableAmount && (
              <span className="text-red-500 text-sm">
                {errors.payableAmount.message}
              </span>
            )}
          </div>

          {/* Completion Date */}
          <div className="flex flex-col">
            <label
              className="font-semibold text-gray-700"
              htmlFor="completionDate"
            >
              Completion Date
            </label>
            <DatePicker
              selected={completionDate}
              onChange={(date) =>
                setCompletionDate(format(new Date(date), "P"))
              }
              className="p-2 border border-gray-300 rounded-md"
            />
            {errors.completionDate && (
              <span className="text-red-500 text-sm">
                {errors.completionDate.message}
              </span>
            )}
          </div>

          {/* Submission Info */}
          <div className="flex flex-col">
            <label
              className="font-semibold text-gray-700"
              htmlFor="submissionInfo"
            >
              Submission Info (e.g., screenshot, proof)
            </label>
            <textarea
              id="submissionInfo"
              placeholder="What to submit after task completion"
              className="p-2 border border-gray-300 rounded-md"
              rows="3"
              {...register("submissionInfo", {
                required: "Submission info is required",
              })}
            />
            {errors.submissionInfo && (
              <span className="text-red-500 text-sm">
                {errors.submissionInfo.message}
              </span>
            )}
          </div>

          {/* Task Image URL */}
          <div className="flex flex-col">
            <label
              className="font-semibold text-gray-700"
              htmlFor="taskImageUrl"
            >
              Task Image
            </label>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <input
                type="file"
                id="taskImageUrl"
                placeholder="Image URL to attract workers"
                className="flex-1 outline-none p-2 text-gray-800"
                {...register("taskImageUrl")}
              />
              <FaImage className="text-green-500 ml-2" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 flex items-center justify-center space-x-2"
          >
            <FaPlusCircle />
            <span>Add Task</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
