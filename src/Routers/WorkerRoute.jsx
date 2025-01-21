import { useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { useEffect } from "react";

const WorkerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  if (role === "worker") {
    return children;
  }

  useEffect(() => {
    if (!isLoading && role !== "worker") {
      navigate("/");
    }
  }, [isLoading, role, navigate]);

  return null;
};

export default WorkerRoute;
