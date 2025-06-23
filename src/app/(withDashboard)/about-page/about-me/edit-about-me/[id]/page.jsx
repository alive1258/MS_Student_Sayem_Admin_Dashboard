import EditAboutMe from "@/components/UI/AboutSection/AboutMe/EditAboutMe";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditAboutMe id={id} />
    </>
  );
};

export default page;
