import EditProjectCategory from "@/components/UI/ProjectSection/ProjectCategories/EditProjectCategory";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditProjectCategory id={id} />
    </>
  );
};

export default page;
