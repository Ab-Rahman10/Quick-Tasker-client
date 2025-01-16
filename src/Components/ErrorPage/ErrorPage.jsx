import { Link } from "react-router-dom";
import errorImage from "../../assets/images.jpeg";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <img src={errorImage} alt="Error" className="w-1/2 mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-red-600">Oops!</h1>
        <p className="text-xl text-gray-700 mt-4">
          Something went wrong or the page you are looking for doesn’t exist.
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Please check the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-custom-orange text-white py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 font-bold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
