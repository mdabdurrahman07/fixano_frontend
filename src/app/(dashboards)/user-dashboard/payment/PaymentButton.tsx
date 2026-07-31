"use client";

import React, { useActionState } from "react";
import { paymentAction } from "../_userActions/paymentAction";

const PaymentButton = ({ bookingId }: { bookingId: string }) => {
  const boundAction = paymentAction.bind(null, bookingId);
  const [state, action, pending] = useActionState(boundAction, null);
  return (
    <form action={action}>
      <button type="submit" disabled={pending} className="bg-primary px-4 py-2 text-white text-lg rounded-md">
        {pending ? "Redirecting..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentButton;
