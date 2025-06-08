import EditHomeHero from "@/components/UI/HomeSection/HomeHero/EditHomeHero";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditHomeHero id={id} />
    </>
  );
};

export default page;
