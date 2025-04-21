import EditFaq from "@/components/Faqs/EditFaq";

const FaqPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditFaq id={id} />
    </>
  );
};

export default FaqPage;
