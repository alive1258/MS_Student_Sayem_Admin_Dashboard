import EditGroup from "@/components/Groups/EditGroup";

const EditGroupPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditGroup id={id} />
    </>
  );
};

export default EditGroupPage;
