import EditSnapshot from "@/components/UI/AboutSection/Snapshots/EditSnapshot";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditSnapshot id={id} />
    </>
  );
};

export default page;
