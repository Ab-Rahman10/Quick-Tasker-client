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
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../Pages/Dashboard/Admin/ManageTasks";

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
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <AdminRoute>
            <ManageTasks></ManageTasks>
          </AdminRoute>
        ),
      },

      // Buyer---------------------------------------
      {
        path: "buyer-home",
        element: (
          <BuyerRoute>
            <BuyerHome></BuyerHome>
          </BuyerRoute>
        ),
      },
      {
        path: "add-new-task",
        element: (
          <BuyerRoute>
            <AddNewTask></AddNewTask>
          </BuyerRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <BuyerRoute>
            <MyTasks></MyTasks>
          </BuyerRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <BuyerRoute>
            <PurchaseCoin></PurchaseCoin>
          </BuyerRoute>
        ),
      },
      {
        path: "update-task/:id",
        element: (
          <BuyerRoute>
            <TaskUpdateForm></TaskUpdateForm>
          </BuyerRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/task/${params.id}`),
      },

      // Worker----------------------------------------------
      {
        path: "worker-home",
        element: (
          <WorkerRoute>
            <WorkerHome></WorkerHome>
          </WorkerRoute>
        ),
      },
      {
        path: "task-list",
        element: (
          <WorkerRoute>
            <TaskList></TaskList>
          </WorkerRoute>
        ),
      },
      {
        path: "my-submissions",
        element: (
          <WorkerRoute>
            <MySubmissions></MySubmissions>
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            {" "}
            <WithDrawals></WithDrawals>
          </WorkerRoute>
        ),
      },
      {
        path: "task-details/:id",
        element: (
          <WorkerRoute>
            <TaskDetails></TaskDetails>
          </WorkerRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/task-details/${params.id}`),
      },
    ],
  },
]);

export default router;
