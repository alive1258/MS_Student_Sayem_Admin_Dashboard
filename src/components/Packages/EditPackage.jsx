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
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} from "@/redux/api/packagesApi";

const EditPackage = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: packageData,
    isLoading: fetchLoading,
    error,
  } = useGetSinglePackageQuery(id);

  const [updatePackage, { isLoading }] = useUpdatePackageMutation();

  const router = useRouter();

  useEffect(() => {
    if (packageData) {
      setValue("name", packageData?.data?.name || "");
      setValue("package_type", packageData?.data?.package_type || "");
      setValue("point", packageData?.data?.point || "");
      setValue("family_group", packageData?.data?.family_group || "");
      setValue("circle_group", packageData?.data?.circle_group || "");
      setValue(
        "family_group_member",
        packageData?.data?.family_group_member || ""
      );
      setValue(
        "circle_group_member",
        packageData?.data?.circle_group_member || ""
      );
      setValue("wywtm_member", packageData?.data?.wywtm_member || "");
      setValue(
        "family_group_total_tracking",
        packageData?.data?.family_group_total_tracking || ""
      );
      setValue(
        "circle_group_total_tracking",
        packageData?.data?.circle_group_total_tracking || ""
      );
      setValue(
        "wywtm_total_tracking",
        packageData?.data?.wywtm_total_tracking || ""
      );
    }
  }, [packageData, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        package_type: Number(data.package_type),
        point: Number(data.point),
        family_group: Number(data.family_group),
        circle_group: Number(data.circle_group),
        family_group_member: Number(data.family_group_member),
        circle_group_member: Number(data.circle_group_member),
        wywtm_member: Number(data.wywtm_member),
        family_group_total_tracking: Number(data.family_group_total_tracking),
        circle_group_total_tracking: Number(data.circle_group_total_tracking),
        wywtm_total_tracking: Number(data.wywtm_total_tracking),
      };
      if (Number(data.package_type) > 3) {
        toast.error("Package type must not exceed 3", {
          position: toast.TOP_RIGHT,
        });
        return; // stop the form submission
      }
      const res = await updatePackage({ id, data: updatedData }).unwrap();

      // const res = await updateGroupType({ id: id, data }).unwrap();
      if (res?.success === true) {
        router.back();
        toast.success("Package updated successfully!", {
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
          big_title={"Edit Package"}
          link_one={"/"}
          link_tow={"/packages/edit-package"}
          title_one={"Home"}
          title_two={"Edit Package"}
        />
      </div>

      <div className="add_form_section">
        <h1 className="add_section_title">Edit Package Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-2  items-start  gap-x-4 gap-y-2">
            <Input
              placeholder="Enter Package Name"
              text="name"
              label="Package Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Package Type"
              text="package_type"
              label="Package Type"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Point"
              text="point"
              label="Point"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Family Group"
              text="family_group"
              label="Family Group"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Circle Group"
              text="circle_group"
              label="Circle Group"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Family Group Member"
              text="family_group_member"
              label="Family Group Member"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Circle Group Member"
              text="circle_group_member"
              label="Circle Group Member"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter wywtm Member"
              text="wywtm_member"
              label="wywtm Member"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Family Group Total Tracking"
              text="family_group_total_tracking"
              label="Family Group Total Tracking"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Circle Group Total Tracking"
              text="circle_group_total_tracking"
              label="Circle Group Total Tracking"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter wywtm Total Tracking"
              text="wywtm_total_tracking"
              label="wywtm Total Tracking"
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

export default EditPackage;
