"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import Textarea from "@/components/common/Textarea/Textarea";
import FileInput from "@/components/common/FileInput/FileInput";
import { useCreateProjectsMutation } from "@/redux/api/projectsApi";
import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import { useGetAllProjectCategoriesQuery } from "@/redux/api/projectCategories.api";
import { useGetAllExtraCurriculumCategoriesQuery } from "@/redux/api/extraCurriculumCategoriesApi";
import { useCreateExtraCurriculumsMutation } from "@/redux/api/extraCurriculumsApi";

const AddExtraCurriculum = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();
  const router = useRouter();
  const [createExtraCurriculum, { isLoading }] =
    useCreateExtraCurriculumsMutation();
  const propertiesToRemove = ["extra_curriculum_category_name"];

  const { data: extraCurriculumCategoriesData } =
    useGetAllExtraCurriculumCategoriesQuery({});

  const extraCurriculumCategoryData = extraCurriculumCategoriesData?.data?.data;

  const onSubmit = async (data) => {
    try {
      propertiesToRemove?.forEach((property) => {
        delete data[property];
      });
      const formData = new FormData();
      formData.append(
        "extra_curriculum_categories_id",
        data.extra_curriculum_categories_id
      );
      formData.append("title", data.title);
      formData.append("institute", data.institute);
      formData.append("organization", data.organization);
      formData.append("description", data.description);

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const res = await createExtraCurriculum(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Extra Curriculum  added successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <section className="md:px-6 px-4 mt-6 pb-4 rounded-lg">
      <SectionTitle
        big_title={"Add Extra Curriculum "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/extra-curriculum/extra-curriculums/all-extra-curriculums"}
        title_two={"All Extra Curriculum"}
        title_three={"Add Extra Curriculum"}
        link_three={"/extra-curriculum/extra-curriculums/add-extra-curriculum"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">
          Create Extra Curriculum Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <SelectAndSearch
              options={extraCurriculumCategoryData?.map((type) => ({
                id: type?.id,
                name: type?.title,
              }))}
              type_id={"extra_curriculum_categories_id"}
              type_name={"extra_curriculum_category_name"}
              label="Select extra_curriculum category"
              placeholder="Select a extra_curriculum category"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"extra_curriculum category is required"}
            />
            <Input
              placeholder="Enter Your Extra Curriculum Title"
              text="title"
              label="Your  Extra Curriculum Title"
              register={register}
              errors={errors}
            />

            <Input
              placeholder="Enter institute"
              text="institute"
              label="institute "
              required={false}
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter organization"
              text="organization"
              label="organization"
              register={register}
              errors={errors}
            />

            <div className="md:col-span-2">
              <Input
                placeholder="Enter organization Time"
                text="description"
                label="organization Time"
                register={register}
                errors={errors}
              />

              <FileInput
                placeholder="Choose File"
                text="photo"
                label="Upload Photo"
                register={register}
                required={false}
                setValue={setValue}
                errors={errors}
              />
            </div>
          </div>

          <div>
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? <FetchLoading /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddExtraCurriculum;
