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
  useGetSingleEducationQuery,
  useUpdateEducationMutation,
} from "@/redux/api/educationApi";

const EditEducation = ({ id }) => {
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
  } = useGetSingleEducationQuery(id, { skip: !id });
  const [updateEducation, { isLoading }] = useUpdateEducationMutation();

  const router = useRouter();

  useEffect(() => {
    if (educationData) {
      setValue("faculty_name", educationData.data.faculty_name || "");
      setValue("institute_name", educationData.data.institute_name || "");
      setValue("session", educationData.data.session || "");
      setValue("result", educationData.data.result || "");
      setValue("subject", educationData.data.subject || "");
    }
  }, [educationData, setValue]);

  const onSubmit = async (data) => {
    try {
      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateEducation({ id, data }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Education updated successfully!", {
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
          big_title={"Edit Education"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All Education"}
          link_two={"/home-page/education/all-educations"}
          link_three={`/home-page/education/edit-education/${id}`}
          title_three={"Edit Education"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Education Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            {/* Headline Input */}
            <Input
              placeholder="Enter Faculty Name"
              text="faculty_name"
              label="Faculty Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Institute Name"
              text="institute_name"
              label="Institute Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Session"
              text="session"
              label="Session"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter result"
              text="result"
              label="Result"
              register={register}
              errors={errors}
            />
            <div className="md:col-span-2">
              <Input
                placeholder="Enter subject"
                text="subject"
                label="Subject"
                register={register}
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

export default EditEducation;
