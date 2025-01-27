import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";

const TaskUpdateForm = () => {
  const axiosSecure = useAxiosSecure();
  const taskData = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = async (e, taskData) => {
    e.preventDefault();

    // Update the task
    const updateData = {
      title: e.target.title.value,
      detail: e.target.detail.value,
      submission_info: e.target.submission_info.value,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/task/${taskData._id}`,
        updateData
      );
      // console.log(data);

      if (data.modifiedCount > 0) {
        toast.success("Task Updated successfully!");
        navigate("/dashboard/my-tasks");
      } else {
        toast.error("No updates detected. Please make a change and try again.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => handleUpdate(e, taskData)}
        className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Update Task
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              defaultValue={taskData.title}
              type="text"
              id="title"
              name="title"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Completion Date Field */}
          <div>
            <label
              htmlFor="completion_date"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Completion Date
            </label>
            <input
              defaultValue={taskData.completion_date}
              readOnly
              type="text"
              id="completion_date"
              name="completion_date"
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Required Workers Field */}
          <div>
            <label
              htmlFor="required_workers"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Required Workers
            </label>
            <input
              defaultValue={taskData.required_workers}
              readOnly
              type="number"
              id="required_workers"
              name="required_workers"
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Payable Amount Field */}
          <div>
            <label
              htmlFor="payable_amount"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Payable Amount
            </label>
            <input
              defaultValue={taskData.payable_amount}
              readOnly
              type="number"
              id="payable_amount"
              name="payable_amount"
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submission Info Field */}
          <div>
            <label
              htmlFor="submission_info"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Submission Info
            </label>
            <input
              defaultValue={taskData.submission_info}
              type="text"
              id="submission_info"
              name="submission_info"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Task Image Field */}
          <div>
            <label
              htmlFor="task_image"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Task Image URL
            </label>
            <input
              defaultValue={taskData.task_image}
              readOnly
              type="url"
              id="task_image"
              name="task_image"
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Detail Field */}
        <div className="mt-6">
          <label
            htmlFor="detail"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Detail
          </label>
          <textarea
            defaultValue={taskData.detail}
            id="detail"
            name="detail"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="w-full md:w-auto py-3 px-6 font-semibold rounded bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdateForm;
