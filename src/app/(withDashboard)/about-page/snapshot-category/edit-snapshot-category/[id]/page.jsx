import EditSnapshotCategory from "@/components/UI/AboutSection/SnapshotCategory/EditSnapshotCategory";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditSnapshotCategory id={id} />
    </>
  );
};

export default page;
