import { useState } from "react";
import useGetUserCoins from "../../../Hooks/useGetUserCoins";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Withdrawals = () => {
  const { user } = useAuth();
  const [coins] = useGetUserCoins();
  const axiosSecure = useAxiosSecure();
  const [coinToWithdraw, setCoinToWithdraw] = useState(" ");
  const navigate = useNavigate();

  const handleCoinChange = (e) => {
    const value = Math.min(e.target.value, coins); // it returns min value
    setCoinToWithdraw(value);
  };

  // handle submit =-----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Now save into db-----
    const form = e.target;
    const withdrawInfo = {
      coins: coinToWithdraw,
      amount: coinToWithdraw / 20,
      payment_system: form.payment_system.value,
      account_number: form.account_number.value,
      status: "pending",
      user: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {
      const { data } = await axiosSecure.post("/withdraw", withdrawInfo);
      if (data?.insertedId) {
        toast.success(
          "Your withdrawal request has been submitted successfully!"
        );
        navigate("/dashboard/task-list");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "There was an issue with your withdrawal request. Please try again."
      );
    }
  };

  return (
    <div className="lg:mt-4 lg:ml-4">
      <div className="bg-gray-50 py-10 px-6 space-y-8 rounded-lg shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          User Total Earning
        </h1>

        {/* Coins and Withdrawal Amount Section */}
        <div className="space-y-6">
          {/* Current Coins */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-600">
              Current Coins:
            </span>
            <span className="text-xl font-bold text-amber-500">{coins}</span>
          </div>

          {/* Withdrawal Amount */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-600">
              Withdrawal Amount:
            </span>
            <span className="text-xl font-bold text-green-500">
              ${coins / 20}
            </span>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-center text-sm text-gray-500">
          You can withdraw when you have a minimum of{" "}
          <span className="font-semibold text-gray-700">200 coins</span>{" "}
          (equivalent to $10).
        </p>

        {/* Withdrawal Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Withdrawal Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Coin to Withdraw */}
            <div className="mb-4">
              <label
                htmlFor="coinToWithdraw"
                className="block text-sm font-medium text-gray-700"
              >
                Coin to Withdraw
              </label>
              <input
                type="number"
                id="coinToWithdraw"
                className="mt-1 block w-full p-2 border rounded-md focus:border-green-500 focus:ring focus:ring-green-500 transition-all duration-200 ease-in-out"
                placeholder="Enter amount"
                min="0"
                max={coins}
                value={coinToWithdraw}
                onChange={handleCoinChange}
                required
              />
            </div>

            {/* Withdrawal Amount ($) */}
            <div className="mb-4">
              <label
                htmlFor="withdrawAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Withdrawal Amount ($)
              </label>
              <input
                type="number"
                id="withdrawAmount"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-green-500 focus:border-green-500 focus:ring focus:ring-green-500 transition-all duration-200 ease-in-out"
                value={coinToWithdraw / 20}
                readOnly
              />
            </div>

            {/* Payment System */}
            <div className="mb-4">
              <label
                htmlFor="payment_system"
                className="block text-sm font-medium text-gray-700"
              >
                Select Payment System
              </label>
              <select
                name="payment_system"
                id="paymentSystem"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring focus:ring-green-500 transition-all duration-200 ease-in-out"
                required
              >
                <option value="bkash">Bkash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Account Number
              </label>
              <input
                name="account_number"
                type="text"
                id="accountNumber"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring focus:ring-green-500 transition-all duration-200 ease-in-out"
                placeholder="Enter account number"
                required
              />
            </div>

            {/* Withdraw Button */}
            <div className="mt-6 text-center">
              {coinToWithdraw >= 200 ? (
                <button
                  type="submit"
                  className="w-full p-2 bg-green-500 text-white rounded-md"
                >
                  Withdraw
                </button>
              ) : (
                <p className="text-red-500 text-sm">Insufficient coin</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
