"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import {
  useGetSingleSkillsCategoryQuery,
  useUpdateSkillsCategoryMutation,
} from "@/redux/api/skillsCategoryApi";

const EditSkillsCategory = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: skillCategoryData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleSkillsCategoryQuery(id, { skip: !id });
  const [updateSkillsCategory, { isLoading }] =
    useUpdateSkillsCategoryMutation();

  const router = useRouter();

  useEffect(() => {
    if (skillCategoryData) {
      setValue("title", skillCategoryData.data.title || "");
    }
  }, [skillCategoryData, setValue]);

  const onSubmit = async (data) => {
    try {
      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateSkillsCategory({ id, data }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Skills Category updated successfully!", {
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
          big_title={"Edit Skills Category"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All Skills Category"}
          link_two={"/home-page/skills-category/all-skills-categories"}
          link_three={`/home-page/skills-category/edit-skills-category/${id}`}
          title_three={"Edit SkillsCategory"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Skills Category Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1  items-end gap-y-2 gap-x-5">
            {/* Headline Input */}
            <Input
              placeholder="Enter Skills Category title"
              text="title"
              label="Skills Category title"
              register={register}
              errors={errors}
            />
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

export default EditSkillsCategory;
