import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://quick-tasker-server.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  // request interceptor to add authorization header for every secure call
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      // send token to server
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      // console.log("Caught from inceptors req", err);

      return Promise.reject(err);
    }
  );

  // Intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      // Logout the user if the token is invalid and kick him to login page.
      // console.log("Caught from inceptors res", err);
      const status = err.response.status;
      if (status === 401 || status === 403) {
        logoutUser();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
