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
  useGetSingleCollaboratingQuery,
  useUpdateCollaboratingMutation,
} from "@/redux/api/collaboratingApi";

const EditCollaborating = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: collaboratingData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleCollaboratingQuery(id, { skip: !id });
  const [updateCollaborating, { isLoading }] = useUpdateCollaboratingMutation();

  const router = useRouter();

  useEffect(() => {
    if (collaboratingData) {
      setValue("title", collaboratingData.data.title || "");
      setValue("email", collaboratingData.data.email || "");
      setValue("phone", collaboratingData.data.phone || "");
      setValue("linkedin_link", collaboratingData.data.linkedin_link || "");
      setValue("location", collaboratingData.data.location || "");
    }
  }, [collaboratingData, setValue]);

  const onSubmit = async (data) => {
    try {
      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateCollaborating({ id, data }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Collaborating updated successfully!", {
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
          big_title={"Edit Collaborating"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All Collaborating"}
          link_two={"/home-page/collaborating/all-collaborating"}
          link_three={`/home-page/collaborating/edit-collaborating/${id}`}
          title_three={"Edit Collaborating"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Collaborating Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Collaborating Title"
              text="title"
              label="Collaborating Title"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Email"
              text="email"
              label="Email"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter phone"
              text="phone"
              label="Phone"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Linkedin Link"
              text="linkedin_link"
              label="Linkedin Link"
              register={register}
              errors={errors}
            />
            <div className="md:col-span-2">
              <Input
                placeholder="Enter Location"
                text="location"
                label="Location"
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

export default EditCollaborating;
