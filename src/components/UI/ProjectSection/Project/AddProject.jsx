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

const AddProject = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectsMutation();
  const propertiesToRemove = ["project_category_name"];

  const { data: ProjectCategoriesData } = useGetAllProjectCategoriesQuery({});

  const projectCategoryDataData = ProjectCategoriesData?.data?.data;

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -

  const projectTitle = watch("project_title");

  useEffect(() => {
    if (projectTitle) {
      const slug = slugify(projectTitle);
      setValue("slug", slug);
    }
  }, [projectTitle, setValue]);

  const onSubmit = async (data) => {
    try {
      propertiesToRemove?.forEach((property) => {
        delete data[property];
      });
      const formData = new FormData();
      formData.append("project_category_id", data.project_category_id);
      formData.append("project_title", data.project_title);
      formData.append("slug", data.slug);
      formData.append("project_tags", data.project_tags);
      formData.append("publish_time", data.publish_time);
      formData.append("project_description", data.project_description);
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      const res = await createProject(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Project  added successfully!", {
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
        big_title={"Add Project "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/projects/project/all-projects"}
        title_two={"All Project"}
        title_three={"Add Project"}
        link_three={"/projects/project/add-project"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Project Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <SelectAndSearch
              options={projectCategoryDataData?.map((type) => ({
                id: type?.id,
                name: type?.name,
              }))}
              type_id={"project_category_id"}
              type_name={"project_category_name"}
              label="Select project category"
              placeholder="Select a project category"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"project category is required"}
            />
            <Input
              placeholder="Enter Your Project Title"
              text="project_title"
              label="Your  Project Title"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="slug"
              text="slug"
              label="slug"
              register={register}
              readOnly
              errors={errors}
            />

            <Input
              placeholder="Enter Project Tags"
              text="project_tags"
              label="Project Tags "
              required={false}
              register={register}
              errors={errors}
            />

            <div className="md:col-span-2">
              <Input
                placeholder="Enter Publish Time"
                text="publish_time"
                label="Publish Time"
                register={register}
                errors={errors}
              />
              <Textarea
                placeholder="Enter Description"
                text="project_description"
                label="Description"
                required={false}
                register={register}
                errors={errors}
              />
              <FileInput
                placeholder="Choose File"
                text="thumbnail"
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

export default AddProject;
