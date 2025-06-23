import EditSkillsCategory from "@/components/UI/HomeSection/SkillsCategory/EditSkillsCategory";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditSkillsCategory id={id} />
    </>
  );
};

export default page;
