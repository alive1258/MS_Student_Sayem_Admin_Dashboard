"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUpdateGroupMutation } from "@/redux/api/groupsApi";
import FcDatePicker from "../common/FcDatePicker/FcDatePicker";
import { useGetSingleGroupQuery } from "@/redux/api/groupsApi"; // Ensure this hook is correctly imported
import { useGetAllGroupTypesQuery } from "@/redux/api/groupTypesApi"; // Ensure this hook is correctly imported
import TableSkeleton from "../common/Loading/TableSkeleton";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";
import Input from "../common/Forms/Input";

const EditGroup = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();
  const router = useRouter();

  // Fetching the group data by ID
  const {
    data: groupData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleGroupQuery(id);

  // Mutation hook for updating the group
  const [updateGroup, { isLoading }] = useUpdateGroupMutation();

  // To watch the group_type_id field for changes
  const watchGroupType = watch("group_type_id");
  const propertiesToRemove = ["group_name"];

  // Fetch group types data for the select input
  const { data: groupTypeData } = useGetAllGroupTypesQuery({});

  const groupTypeOptions = groupTypeData?.data?.map((groupType) => ({
    id: groupType?.id,
    name: groupType?.name,
  }));
  console.log(groupData, "groupData............");

  // Setting form values once the group data is fetched
  useEffect(() => {
    if (groupData) {
      setValue("name", groupData.data.name || "");
      if (groupData) {
        setValue("group_type_id", groupData?.data?.group_type_id);
        setValue("group_name", groupData?.data?.group_type?.name);
      }

      // Format check_in_time and check_out_time to the correct format (YYYY-MM-DDTHH:MM)
      const formatTime = (time) => {
        if (time) {
          return time.slice(0, 5); // Extract HH:MM from "HH:MM:SS"
        }
        return "";
      };

      setValue("check_in_time", formatTime(groupData?.data?.check_in_time));
      setValue("check_out_time", formatTime(groupData?.data?.check_out_time));
    }
  }, [groupData, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    data.group_type_id = watchGroupType; // Ensure the latest selected group_type_id is included
    propertiesToRemove?.forEach((property) => {
      delete data[property];
    });

    try {
      // Prepare data for update, removing unnecessary properties
      const updatedData = {
        ...data,
        check_in_time: data.check_in_time
          ? new Date(data.check_in_time).toISOString()
          : null,
        check_out_time: data.check_out_time
          ? new Date(data.check_out_time).toISOString()
          : null,
        group_type_id: Number(data.group_type_id),
      };

      // Call the mutation to update the group
      const res = await updateGroup({ id, data: updatedData }).unwrap();
      if (res?.success) {
        router.back();
        toast.success("Group updated successfully!", {
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

  // Loading and error handling
  if (fetchLoading || isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-[85vh] w-full items-center justify-center">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <section className=" mx-5 rounded-lg">
      {/* Header Section */}
      <div className="px-2 md:px-5">
        <SectionTitle
          big_title={"Edit Group"}
          link_one={"/"}
          title_one={"Home"}
          link_tow={`/groups/all-groups`}
          title_two={"All Groups"}
        />
      </div>

      {/* Form Section */}
      <div className="add_form_section">
        <h1 className="add_section_title">Edit Group Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-1 items-start gap-5">
            {/* Group Type Select */}
            <SelectAndSearch
              options={groupTypeOptions}
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
            {/* Group Name Input */}
            <Input
              placeholder="Enter Group Name"
              text="name"
              label="Group Name"
              register={register}
              errors={errors}
            />
            {/* Check In Time Picker */}
            <FcDatePicker
              label="Check In Time"
              placeholder="Select Check In Time"
              text="check_in_time"
              register={register}
              setValue={setValue}
              errors={errors}
              value={watch("check_in_time") || ""} // Pass the watched value as defaultValue
            />
            {/* Check Out Time Picker */}
            <FcDatePicker
              label="Check Out Time"
              placeholder="Select Check Out Time"
              text="check_out_time"
              register={register}
              setValue={setValue}
              errors={errors}
              value={watch("check_out_time") || ""}
            />
          </div>

          <div className="pt-4">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditGroup;
