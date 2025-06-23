import EditSectionDescription from "@/components/UI/SectionDescription/EditSectionDescription";

const TestimonialPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditSectionDescription id={id} />
    </>
  );
};

export default TestimonialPage;
