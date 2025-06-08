"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FileInput from "@/components/common/FileInput/FileInput";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import Textarea from "@/components/common/Textarea/Textarea";

import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectsApi";
import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import { useGetAllProjectCategoriesQuery } from "@/redux/api/projectCategories.api";

const EditProject = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: homAboutData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleProjectQuery(id, { skip: !id });
  const router = useRouter();
  const [updateHomeAbout, { isLoading }] = useUpdateProjectMutation();
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

  const watchPhoto = watch("thumbnail");

  const currentPhoto =
    homAboutData?.data?.thumbnail &&
    process.env.NEXT_PUBLIC_IMAGE_PATH + homAboutData?.data?.thumbnail;

  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;

  const cacheBustedImage = currentPhoto + "?t=" + new Date().getTime();

  useEffect(() => {
    if (homAboutData) {
      const { projectCategory } = homAboutData?.data;

      if (projectCategory) {
        setValue("project_category_id", projectCategory?.id);
        setValue("project_category_name", projectCategory?.name);
      }

      setValue("project_title", homAboutData.data.project_title || "");
      setValue("project_title", homAboutData.data.project_title || "");
      setValue("slug", homAboutData.data.slug || "");
      setValue("project_tags", homAboutData.data.project_tags || "");
      setValue("publish_time", homAboutData.data.publish_time || "");
      setValue(
        "project_description",
        homAboutData.data.project_description || ""
      );
    }
  }, [homAboutData, setValue]);

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

      const res = await updateHomeAbout({ id, data: formData }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Home About updated successfully!", {
          position: toast.TOP_RIGHT,
        });
        refetch();
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };
  // Sometimes browser caches the image and doesn’t refetch it even if it's updated. To fix this, add a query param:
  // useEffect(() => {
  //   if (id) refetch();
  // }, [id]);

  if (fetchLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error?.message}</div>;
  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <div>
        <SectionTitle
          big_title={"Edit Home Hero"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All Home Hero"}
          link_two={"/home-page/home-hero/all-home-heros"}
          link_three={`/home-page/home-hero/edit-home-hero/${id}`}
          title_three={"Edit Home Hero"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Home Hero Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            {/* Headline Input */}

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
            </div>

            <div className="col-span-2">
              {/* Show Current Image if no new thumbnail is selected */}

              {(previewPhoto || cacheBustedImage) && (
                <div className="col-span-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {previewPhoto ? "New Selected Photo" : "Current Photo"}
                  </label>
                  <Image
                    src={previewPhoto || cacheBustedImage}
                    width={250}
                    height={150}
                    alt="Preview"
                    className="rounded object-cover shadow"
                  />
                </div>
              )}

              <FileInput
                placeholder="Choose File"
                text="thumbnail"
                label="Change thumbnail"
                register={register}
                required={false}
                setValue={setValue}
                errors={errors}
              />
            </div>
          </div>

          <div className="pt-4">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? <FetchLoading /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
