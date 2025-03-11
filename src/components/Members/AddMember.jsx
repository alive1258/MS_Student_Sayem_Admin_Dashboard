"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";
import Input from "../common/Forms/Input";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";
import { useCreateMembersMutation } from "@/redux/api/membersApi";
import { useGetAllGroupsQuery } from "@/redux/api/groupsApi";
import { useGetAllUsersQuery } from "@/redux/api/userApi";

const AddMember = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [createGroup, { isLoading }] = useCreateMembersMutation();

  const { data: allUsersData } = useGetAllUsersQuery({});
  const users = allUsersData?.data?.data;

  const router = useRouter();
  const propertiesToRemove = ["group_name", "user_name"];

  // Extract company data
  const { data: groupData } = useGetAllGroupsQuery({});
  const groupsData = groupData?.data;

  // Form submission handler
  const onSubmit = async (data) => {
    propertiesToRemove?.forEach((property) => {
      delete data[property];
    });

    try {
      // Make API request to create designation
      const res = await createGroup(data).unwrap(); // Pass formattedData directly
      if (res?.success) {
        reset();
        router.back();
        toast.success("Member added successfully!", {
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
            big_title={"Add Member "}
            link_one={"/"}
            link_tow={"/member/add-member"}
            title_one={"Home"}
            title_two={"Make Member "}
          />
        </div>

        <div className="add_form_section">
          <h1 className="add_section_title">Create Member Step by Step</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="my-5">
            <div className="grid sm:grid-cols-1  items-start  gap-2">
              <SelectAndSearch
                options={users?.map((user) => ({
                  id: user?.id,
                  name: user?.name,
                }))}
                type_id={"user_id"}
                type_name={"user_name"}
                label="Select User "
                placeholder="Select a User "
                register={register}
                required={true}
                setValue={setValue}
                errors={errors}
                message={"User  is required"}
              />
              <SelectAndSearch
                options={groupsData?.map((type) => ({
                  id: type?.id,
                  name: type?.name,
                }))}
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

export default AddMember;
