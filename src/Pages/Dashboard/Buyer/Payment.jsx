import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const purchaseInfo = location.state || {};

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm purchaseInfo={purchaseInfo} />
      </Elements>
    </div>
  );
};

export default Payment;
