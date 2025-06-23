import EditSkill from "@/components/UI/HomeSection/Skills/EditSkill";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditSkill id={id} />
    </>
  );
};

export default page;
