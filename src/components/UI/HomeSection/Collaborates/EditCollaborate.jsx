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
  useGetSingleCollaborateQuery,
  useUpdateCollaborateMutation,
} from "@/redux/api/collaborateApi";
import Textarea from "@/components/common/Forms/Textarea";

const EditCollaborate = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: collaboratesData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleCollaborateQuery(id, { skip: !id });
  const [updateCollaborate, { isLoading }] = useUpdateCollaborateMutation();

  const router = useRouter();

  useEffect(() => {
    if (collaboratesData) {
      setValue("title", collaboratesData.data.title || "");

      setValue("description", collaboratesData.data.description || "");
    }
  }, [collaboratesData, setValue]);

  const onSubmit = async (data) => {
    try {
      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateCollaborate({ id, data }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Collaborate updated successfully!", {
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
          big_title={"Edit Collaborate"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All Collaborate"}
          link_two={"/home-page/collaborates/all-collaborates"}
          link_three={`/home-page/collaborates/edit-collaborate/${id}`}
          title_three={"Edit Collaborate"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Collaborate Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1  items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Collaborate Title"
              text="title"
              label="Collaborate Title"
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

export default EditCollaborate;
