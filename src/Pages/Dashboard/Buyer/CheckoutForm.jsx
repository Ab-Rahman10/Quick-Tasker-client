import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ purchaseInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPaymentIntent();
  }, []);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post(
        "/create-payment-intent",
        purchaseInfo
      );
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  // ----------------------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      return console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      try {
        const { data } = await axiosSecure.post("/order", {
          paymentId: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount / 100, // Stripe returns amount in cents
          currency: paymentIntent.currency,
          paymentDate: new Date().toISOString(),
          user: {
            name: user?.displayName,
            email: user?.email,
          },
          purchase: purchaseInfo, // Send all purchase details
        });

        // Increase buyer coins
        const { data: updateCoinData } = await axiosSecure.patch(
          `/add-payment-coin/${user?.email}`,
          { orderId: data?.insertedId }
        );

        if (updateCoinData?.modifiedCount > 0) {
          toast.success(`Purchase successful!`);
          navigate("/dashboard/payment-history");
        }
      } catch (err) {
        console.error("Failed to save order:", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Complete Your Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Pay Now {purchaseInfo.price}$
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
