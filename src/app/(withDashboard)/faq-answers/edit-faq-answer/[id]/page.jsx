import EditFaqAnswers from "@/components/FaqAnswers/EditFaqAnswers";

const FaqAnsPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditFaqAnswers id={id} />
    </>
  );
};

export default FaqAnsPage;
