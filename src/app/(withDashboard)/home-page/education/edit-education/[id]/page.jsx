import EditEducation from "@/components/UI/HomeSection/Education/EditEducation";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditEducation id={id} />
    </>
  );
};

export default page;
