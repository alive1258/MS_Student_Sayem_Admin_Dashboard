"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";
import Input from "../common/Forms/Input";
import { useCreateGroupsMutation } from "@/redux/api/groupsApi";
import { useGetAllGroupTypesQuery } from "@/redux/api/groupTypesApi";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";
import FcDatePicker from "../common/FcDatePicker/FcDatePicker";

const AddGroup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [createGroup, { isLoading }] = useCreateGroupsMutation();

  const router = useRouter();
  const propertiesToRemove = ["group_name"];

  // Extract company data
  const { data: groupTypeData } = useGetAllGroupTypesQuery({});
  const groupTypesData = groupTypeData?.data;

  // Form submission handler
  const onSubmit = async (data) => {
    propertiesToRemove?.forEach((property) => {
      delete data[property];
    });

    // Ensure data is in the correct format
    const formattedData = {
      ...data,
      check_in_time: data.check_in_time
        ? new Date(data.check_in_time).toISOString()
        : null,
      check_out_time: data.check_out_time
        ? new Date(data.check_out_time).toISOString()
        : null,
      group_type_id: Number(data.group_type_id), // Ensure group_type_id is an integer
    };

    try {
      // Make API request to create designation
      const res = await createGroup(formattedData).unwrap(); // Pass formattedData directly
      if (res?.success) {
        reset();
        router.back();
        toast.success("Group added successfully!", {
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
            big_title={"Add Group "}
            link_one={"/"}
            link_tow={"/groups/add-group"}
            title_one={"Home"}
            title_two={"Make Group "}
          />
        </div>

        <div className="add_form_section">
          <h1 className="add_section_title">Create Group Step by Step</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="my-5">
            <div className="grid sm:grid-cols-1  items-start  gap-2">
              <SelectAndSearch
                options={groupTypesData?.map((type) => ({
                  id: type?.id,
                  name: type?.name,
                }))}
                type_id={"group_type_id"}
                type_name={"group_name"}
                label="Select Group Type"
                placeholder="Select a Group Type"
                register={register}
                required={true}
                setValue={setValue}
                errors={errors}
                message={"Group Type is required"}
              />
              <Input
                placeholder="Enter Group Name"
                text="name"
                label="Group Name"
                register={register}
                errors={errors}
              />
              <FcDatePicker
                label="Check In Time"
                placeholder="Select Check In Time"
                text="check_in_time"
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <FcDatePicker
                label="Check Out Time"
                placeholder="Select Check Out Time"
                text="check_out_time"
                register={register}
                setValue={setValue}
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

export default AddGroup;
