"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import { useCreateProjectCategoriesMutation } from "@/redux/api/projectCategories.api";

const AddProjectCategory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();

  const [createProjectCategory, { isLoading }] =
    useCreateProjectCategoriesMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createProjectCategory(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Project Category added successfully!", {
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
    <section className="md:px-6 px-4 mt-6 pb-4 rounded-lg">
      <SectionTitle
        big_title={"Add Project Category "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/projects/project-categories/all-project-categories"}
        title_two={"All ProjectCategory"}
        title_three={"Add ProjectCategory"}
        link_three={"/projects/project-categories/add-project-category"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">
          Create Project Category Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1  items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Project Category Name"
              text="name"
              label="Project Category "
              register={register}
              errors={errors}
            />
          </div>

          <div>
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? <FetchLoading /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProjectCategory;
