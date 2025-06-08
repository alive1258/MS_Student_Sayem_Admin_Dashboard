import EditExperience from "@/components/UI/HomeSection/Experience/EditExperience";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditExperience id={id} />
    </>
  );
};

export default page;
