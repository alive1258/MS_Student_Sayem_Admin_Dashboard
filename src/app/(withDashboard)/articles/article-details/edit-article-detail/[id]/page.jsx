import EditArticleDetail from "@/components/UI/Article/ArticleDetails/EditArticleDetail";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditArticleDetail id={id} />
    </>
  );
};

export default page;
