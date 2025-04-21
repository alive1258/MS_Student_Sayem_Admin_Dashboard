"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateGroupTypesMutation } from "@/redux/api/groupTypesApi";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import Input from "../common/Forms/Input";

const AddGroupType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [createGroupType, { isLoading }] = useCreateGroupTypesMutation();

  const router = useRouter();

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Make API request to create designation
      const res = await createGroupType({
        ...data,
      }).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Group Type added successfully!", {
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
    <>
      <section className="md:px-6 px-4  mt-6 rounded-lg">
        <div className="px-2">
          <SectionTitle
            big_title={"Add Group Type"}
            link_one={"/"}
            link_tow={"/group-types/add-group-type"}
            title_one={"Home"}
            title_two={"Make Group Type"}
          />
        </div>

        <div className="add_form_section">
          <h1 className="add_section_title">Create Group Type Step by Step</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="my-5">
            <div className="grid sm:grid-cols-1  items-start  gap-2">
              <Input
                placeholder="Enter Group Type Name"
                text="name"
                label="Group Type Name"
                register={register}
                errors={errors}
              />
            </div>
            <div className="pt-4">
              <button disabled={isLoading} className="btn " type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddGroupType;
