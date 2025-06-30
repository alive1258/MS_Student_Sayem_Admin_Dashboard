import EditProfessor from "@/components/UI/Professors/EditProfessor";

const TestimonialPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditProfessor id={id} />
    </>
  );
};

export default TestimonialPage;
