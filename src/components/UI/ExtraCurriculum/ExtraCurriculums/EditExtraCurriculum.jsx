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

import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectsApi";
import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import { useGetAllExtraCurriculumCategoriesQuery } from "@/redux/api/extraCurriculumCategoriesApi";
import {
  useGetSingleExtraCurriculumQuery,
  useUpdateExtraCurriculumMutation,
} from "@/redux/api/extraCurriculumsApi";

const EditExtraCurriculum = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: extraCurriculumData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleExtraCurriculumQuery(id, { skip: !id });
  const router = useRouter();
  const [updateHomeAbout, { isLoading }] = useUpdateExtraCurriculumMutation();
  const propertiesToRemove = ["extra_curriculum_category_name"];

  const { data: extraCurriculumCategoriesData } =
    useGetAllExtraCurriculumCategoriesQuery({});

  const extraCurriculumCategoryData = extraCurriculumCategoriesData?.data?.data;

  const watchPhoto = watch("photo");

  const currentPhoto =
    extraCurriculumData?.data?.photo &&
    process.env.NEXT_PUBLIC_IMAGE_PATH + extraCurriculumData?.data?.photo;

  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;

  const cacheBustedImage = currentPhoto + "?t=" + new Date().getTime();
  // const cacheBustedImage = currentPhoto
  //   ? `${currentPhoto}?t=${new Date().getTime()}`
  //   : null;

  useEffect(() => {
    if (extraCurriculumData) {
      const { extraCurriculumCategory } = extraCurriculumData?.data;

      if (extraCurriculumCategory) {
        setValue("extra_curriculum_categories_id", extraCurriculumCategory?.id);
        setValue(
          "extra_curriculum_category_name",
          extraCurriculumCategory?.title
        );
      }
      setValue("title", extraCurriculumData.data.title || "");
      setValue("institute", extraCurriculumData.data.institute || "");
      setValue("organization", extraCurriculumData.data.organization || "");
      setValue("description", extraCurriculumData.data.description || "");
    }
  }, [extraCurriculumData, setValue]);

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

      const res = await updateHomeAbout({ id, data: formData }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("extra curriculum category updated successfully!", {
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
          big_title={"Edit Extra Curriculum Category"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All Extra Curriculum Category"}
          link_two={"/home-page/home-hero/all-home-heros"}
          link_three={`/home-page/home-hero/edit-home-hero/${id}`}
          title_three={"Edit Extra Curriculum Category"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">
          Edit Extra Curriculum Category Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
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
              placeholder="Enter Your Project Title"
              text="title"
              label="Your  Project Title"
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

            <div className="col-span-2">
              <Input
                placeholder="Enter organization Time"
                text="description"
                label="organization Time"
                register={register}
                errors={errors}
              />
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

              {/* {(previewPhoto || cacheBustedImage) && (
                <div className="col-span-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {previewPhoto ? "New Selected Photo" : "Current Photo"}
                  </label>
                  {(previewPhoto || cacheBustedImage) && (
                    <Image
                      src={previewPhoto || cacheBustedImage}
                      width={250}
                      height={150}
                      alt="Preview"
                      className="rounded object-cover shadow"
                    />
                  )}
                </div>
              )} */}

              <FileInput
                placeholder="Choose File"
                text="photo"
                label="Change photo"
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

export default EditExtraCurriculum;
