import EditMember from "@/components/Members/EditMember";

const EditMemberPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditMember id={id} />
    </>
  );
};

export default EditMemberPage;
