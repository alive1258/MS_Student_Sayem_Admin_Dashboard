import EditPackage from "@/components/Packages/EditPackage";

const EditPackagePage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditPackage id={id} />
    </>
  );
};

export default EditPackagePage;
