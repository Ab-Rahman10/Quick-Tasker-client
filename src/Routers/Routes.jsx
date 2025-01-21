import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layouts/MainLayout/Dashboard";
import AddNewTask from "../Pages/Dashboard/Buyer/AddNewTask";
import BuyerHome from "../Pages/Dashboard/Buyer/BuyerHome";
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks";
import PurchaseCoin from "../Pages/Dashboard/Buyer/PurchaseCoin";
import TaskUpdateForm from "../Components/TaskUpdateForm/TaskUpdateForm";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";
import TaskList from "../Pages/Dashboard/Worker/TaskList";
import MySubmissions from "../Pages/Dashboard/Worker/MySubmissions";
import WithDrawals from "../Pages/Dashboard/Worker/WithDrawals";
import TaskDetails from "../Pages/Dashboard/Worker/TaskDetails";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Admin ---------------------------------------
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },

      // Buyer---------------------------------------
      {
        path: "buyer-home",
        element: <BuyerHome></BuyerHome>,
      },
      {
        path: "add-new-task",
        element: <AddNewTask></AddNewTask>,
      },
      {
        path: "my-tasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "purchase-coin",
        element: <PurchaseCoin></PurchaseCoin>,
      },
      {
        path: "update-task/:id",
        element: <TaskUpdateForm></TaskUpdateForm>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/task/${params.id}`),
      },

      // Worker----------------------------------------------
      {
        path: "worker-home",
        element: <WorkerHome></WorkerHome>,
      },
      {
        path: "task-list",
        element: <TaskList></TaskList>,
      },
      {
        path: "my-submissions",
        element: <MySubmissions></MySubmissions>,
      },
      {
        path: "withdrawals",
        element: <WithDrawals></WithDrawals>,
      },
      {
        path: "task-details/:id",
        element: <TaskDetails></TaskDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/task-details/${params.id}`),
      },
    ],
  },
]);

export default router;
