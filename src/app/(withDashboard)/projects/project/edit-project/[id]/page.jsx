import EditProject from "@/components/UI/ProjectSection/Project/EditProject";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditProject id={id} />
    </>
  );
};

export default page;
