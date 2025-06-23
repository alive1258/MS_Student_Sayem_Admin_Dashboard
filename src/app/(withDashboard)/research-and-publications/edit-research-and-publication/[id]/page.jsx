import EditResearchAndPublication from "@/components/UI/ResearchAndPublication/EditResearchAndPublication";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditResearchAndPublication id={id} />
    </>
  );
};

export default page;
