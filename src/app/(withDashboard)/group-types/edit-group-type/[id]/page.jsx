import EditGroupType from "@/components/GroupTypes/EditGroupType";

const EditGroupTypePage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditGroupType id={id} />
    </>
  );
};

export default EditGroupTypePage;
