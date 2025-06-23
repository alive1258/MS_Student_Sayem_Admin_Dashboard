"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import { useCreateCollaboratingMutation } from "@/redux/api/collaboratingApi";

const AddCollaborating = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();

  const [createCollaborating, { isLoading }] = useCreateCollaboratingMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createCollaborating(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Collaborating added successfully!", {
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
        big_title={"Add Collaborating "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/home-page/collaborating/all-collaborating"}
        title_two={"All Collaborating"}
        title_three={"Add Collaborating"}
        link_three={"/home-page/collaborating/add-collaborating"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Collaborating Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Collaborating Title"
              text="title"
              label="Collaborating Title"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Email"
              text="email"
              label="Email"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter phone"
              text="phone"
              label="Phone"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Linkedin Link"
              text="linkedin_link"
              label="Linkedin Link"
              register={register}
              errors={errors}
            />
            <div className="md:col-span-2">
              <Input
                placeholder="Enter Location"
                text="location"
                label="Location"
                register={register}
                errors={errors}
              />
            </div>
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

export default AddCollaborating;
