import { useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { useEffect } from "react";

const BuyerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  if (role === "buyer") {
    return children;
  }

  useEffect(() => {
    if (!isLoading && role !== "buyer") {
      navigate("/");
    }
  }, [isLoading, role, navigate]);

  return null;
};

export default BuyerRoute;
