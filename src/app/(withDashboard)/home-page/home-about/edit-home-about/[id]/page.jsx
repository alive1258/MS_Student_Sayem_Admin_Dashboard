import EditHomeAbout from "@/components/UI/HomeSection/HomeAbout/EditHomeAbout";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditHomeAbout id={id} />
    </>
  );
};

export default page;
