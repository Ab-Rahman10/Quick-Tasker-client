import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const TaskDetails = () => {
  const task = useLoaderData();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //   send submission info to db
    const submission_info = {
      submission_info: e.target.submission_details.value,
      task_id: task._id,
      title: task.title,
      payable_amount: task.payable_amount,
      worker_name: user?.displayName,
      worker_email: user?.email,
      buyer_name: task.name,
      buyer_email: task.email,
      submission_date: new Date(),
      status: "pending",
    };

    const { data } = await axiosPublic.post("/submission", submission_info);
    if (data.insertedId) {
      toast.success("Task submitted successfully!");
      navigate("/dashboard/task-list");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Task Details
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Task Image */}
        <div className="lg:w-1/3">
          <img
            src={task.task_image}
            alt={task.title}
            className="rounded-lg w-full h-60 object-cover"
          />
        </div>

        {/* Task Details */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-semibold text-green-500 mb-4">
            {task.title}
          </h3>
          <p className="text-gray-600 mb-2">
            <strong>Details:</strong> {task.detail}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Required Workers:</strong> {task.required_workers}
          </p>
          <p className="text-amber-500 mb-2">
            <strong className="text-gray-600">Payable Amount: </strong>
            {task.payable_amount}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Completion Date:</strong> {task.completion_date}
          </p>
        </div>
      </div>

      {/* Submission Form */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Submission Details Form
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Text Area */}
          <textarea
            name="submission_details"
            placeholder="Enter your submission details..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="5"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
