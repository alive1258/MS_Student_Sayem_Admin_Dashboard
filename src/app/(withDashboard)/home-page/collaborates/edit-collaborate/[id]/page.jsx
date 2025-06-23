import EditCollaborate from "@/components/UI/HomeSection/Collaborates/EditCollaborate";

import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditCollaborate id={id} />
    </>
  );
};

export default page;
