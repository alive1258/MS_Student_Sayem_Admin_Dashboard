import EditMyHobby from "@/components/UI/AboutSection/MyHobby/EditMyHobby";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditMyHobby id={id} />
    </>
  );
};

export default page;
