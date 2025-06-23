import EditCollaborating from "@/components/UI/HomeSection/Collaborating/EditCollaborating";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditCollaborating id={id} />
    </>
  );
};

export default page;
