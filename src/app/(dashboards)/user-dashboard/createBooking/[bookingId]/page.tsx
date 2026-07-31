import React from "react";

const AddBookingPage = async ({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) => {
  const { bookingId } = await params;
  console.log("bookingId", bookingId);
  return <div>Add a Booking</div>;
};

export default AddBookingPage;
