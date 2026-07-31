import React from "react";

const AddReviewPage = async ({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) => {
  const { bookingId } = await params;
  console.log("bookingId", bookingId);
  return <div>Add a Review</div>;
};

export default AddReviewPage;
