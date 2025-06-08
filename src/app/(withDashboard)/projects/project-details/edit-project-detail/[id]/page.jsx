import EditProjectDetail from "@/components/UI/ProjectSection/ProjectDetails/EditProjectDetail";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditProjectDetail id={id} />
    </>
  );
};

export default page;
