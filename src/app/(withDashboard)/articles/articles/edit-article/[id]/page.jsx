import EditArticle from "@/components/UI/Article/Articles/EditArticle";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditArticle id={id} />
    </>
  );
};

export default page;
