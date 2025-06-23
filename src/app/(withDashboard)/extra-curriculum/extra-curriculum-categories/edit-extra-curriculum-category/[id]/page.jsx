import EditExtraCurriculumCategory from "@/components/UI/ExtraCurriculum/ExtraCurriculumCategories/EditExtraCurriculumCategory";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditExtraCurriculumCategory id={id} />
    </>
  );
};

export default page;
