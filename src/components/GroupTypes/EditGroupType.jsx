"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  useGetSingleGroupTypeQuery,
  useUpdateGroupTypeMutation,
} from "@/redux/api/groupTypesApi";
import Input from "../common/Forms/Input";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";

const EditGroupType = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: groupTypeData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleGroupTypeQuery(id);

  const [updateGroupType, { isLoading }] = useUpdateGroupTypeMutation();

  const router = useRouter();

  useEffect(() => {
    if (groupTypeData) {
      setValue("name", groupTypeData?.data?.name || "");
    }
  }, [groupTypeData, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await updateGroupType({ id: id, data }).unwrap();
      if (res?.success === true) {
        router.back();
        toast.success("Group Type updated successfully!", {
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

  if (fetchLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="md:px-6 px-4 py-5 rounded-lg">
      <div className="">
        <SectionTitle
          big_title={"Edit Group Type"}
          link_one={"/"}
          link_tow={"/group-types/edit-group-type"}
          title_one={"Home"}
          title_two={"Edit Group Type "}
        />
      </div>

      <div className="add_form_section">
        <h1 className="add_section_title">Edit Mobile Bank Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-1 gap-5">
            <Input
              placeholder="Enter Group Type Name"
              text="name"
              label="Group Type Name"
              register={register}
              errors={errors}
            />
          </div>

          <div className="pt-3">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditGroupType;
