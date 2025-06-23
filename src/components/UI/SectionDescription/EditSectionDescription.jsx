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
  useGetSingleSectionDescriptionQuery,
  useUpdateSectionDescriptionMutation,
} from "@/redux/api/sectionDescriptionApi";
import Textarea from "@/components/common/Forms/Textarea";

const EditSectionDescription = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: educationData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleSectionDescriptionQuery(id, { skip: !id });
  const [updateSectionDescription, { isLoading }] =
    useUpdateSectionDescriptionMutation();

  const router = useRouter();

  useEffect(() => {
    if (educationData) {
      setValue("title", educationData.data.title || "");
      setValue("description", educationData.data.description || "");
    }
  }, [educationData, setValue]);

  const onSubmit = async (data) => {
    try {
      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateSectionDescription({ id, data }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("SectionDescription updated successfully!", {
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
          big_title={"Edit SectionDescription"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All SectionDescription"}
          link_two={"/section-description/all-section-descriptions"}
          link_three={`/section-description/edit-section-description/${id}`}
          title_three={"Edit SectionDescription"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">
          Edit SectionDescription Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 items-end gap-y-2 gap-x-5">
            {/* Headline Input */}
            <Input
              placeholder="Enter Faculty Name"
              text="title"
              label="Faculty Name"
              register={register}
              errors={errors}
            />
            <Textarea
              placeholder="Enter Description"
              text="description"
              label="Description"
              required={false}
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

export default EditSectionDescription;
