import EditArticleCategory from "@/components/UI/Article/ArticleCategories/EditArticleCategory";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditArticleCategory id={id} />
    </>
  );
};

export default page;
