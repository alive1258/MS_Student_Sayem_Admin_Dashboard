"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetAllGroupsQuery } from "@/redux/api/groupsApi";
import TableSkeleton from "../common/Loading/TableSkeleton";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";
import Input from "../common/Forms/Input";
import {
  useGetSingleMemberQuery,
  useUpdateMemberMutation,
} from "@/redux/api/membersApi";
import { useGetAllUsersQuery } from "@/redux/api/userApi";

const EditMember = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const router = useRouter();

  // Fetching the group data by ID
  const {
    data: MemberData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleMemberQuery(id);
  const propertiesToRemove = ["group_name", "user_name"];

  // Mutation hook for updating the group
  const [updateGroup, { isLoading }] = useUpdateMemberMutation();

  const { data: allUsersData } = useGetAllUsersQuery({});

  // Extract company data
  const { data: groupData } = useGetAllGroupsQuery({});

  const groupOptions = groupData?.data?.map((groupType) => ({
    id: groupType?.id,
    name: groupType?.name,
  }));
  const userOptions = allUsersData?.data?.data?.map((user) => ({
    id: user?.id,
    name: user?.name,
  }));

  // Setting form values once the group data is fetched
  useEffect(() => {
    if (MemberData) {
      setValue("status", MemberData?.data?.status || "");
      if (MemberData) {
        setValue("group_id", MemberData?.data?.group_id);
        setValue("group_name", MemberData?.data?.group?.name);
      }
      if (MemberData) {
        setValue("user_id", MemberData?.data?.user_id);
        setValue("user_name", MemberData?.data?.user?.name);
      }
    }
  }, [MemberData, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    propertiesToRemove?.forEach((property) => {
      delete data[property];
    });

    try {
      // Prepare data for update, removing unnecessary properties
      const updatedData = {
        ...data,
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
            {/* User Type Select */}
            <SelectAndSearch
              options={userOptions}
              type_id={"user_id"}
              type_name={"user_name"}
              label="Select User"
              placeholder="Select a User"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={" User is required"}
            />
            <SelectAndSearch
              options={groupOptions}
              type_id={"group_id"}
              type_name={"group_name"}
              label="Select Group "
              placeholder="Select a Group "
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"Group  is required"}
            />
            <Input
              placeholder="Enter status"
              text="status"
              label="Status"
              register={register}
              errors={errors}
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

export default EditMember;
