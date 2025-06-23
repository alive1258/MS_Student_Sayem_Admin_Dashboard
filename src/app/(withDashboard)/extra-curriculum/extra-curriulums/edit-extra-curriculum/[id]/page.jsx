import EditExtraCurriculum from "@/components/UI/ExtraCurriculum/ExtraCurriculums/EditExtraCurriculum";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditExtraCurriculum id={id} />
    </>
  );
};

export default page;
