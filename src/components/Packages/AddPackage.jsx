"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import Input from "../common/Forms/Input";
import { useCreatePackagesMutation } from "@/redux/api/packagesApi";

const AddPackage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [createPackage, { isLoading }] = useCreatePackagesMutation();

  const router = useRouter();

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Make API request to create designation
      const formattedData = {
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
      const res = await createPackage(formattedData).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Package added successfully!", {
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
            link_tow={"/packages/add-package"}
            title_one={"Home"}
            title_two={"Make Group Type"}
          />
        </div>

        <div className="add_form_section">
          <h1 className="add_section_title">Create Package Step by Step</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="my-5">
            <div className="grid sm:grid-cols-2  items-start  gap-x-4 gap-y-2">
              <Input
                placeholder="Enter Package Name"
                text="name"
                label="Package Name"
                register={register}
                errors={errors}
              />
              <div className="mb-4">
                <label className="block mb-1">Package Type</label>

                <input
                  type="number"
                  className="input_style"
                  placeholder="Enter Package Type"
                  {...register("package_type", {
                    required: "Package type is required",
                    min: {
                      value: 1,
                      message: "@Min(1) — Package type must be at least 1",
                    },
                    max: {
                      value: 3,
                      message: "@Max(3) — Package type must not exceed 3",
                    },
                  })}
                />

                {errors?.package_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.package_type.message}
                  </p>
                )}
              </div>

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

export default AddPackage;
