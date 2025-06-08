"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import { useCreateEducationsMutation } from "@/redux/api/educationApi";

const AddEducation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();

  const [createEducation, { isLoading }] = useCreateEducationsMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createEducation(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Education added successfully!", {
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
        big_title={"Add Education "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/home-page/education/all-educations"}
        title_two={"All Education"}
        title_three={"Add Education"}
        link_three={"/home-page/education/add-education"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Education Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Faculty Name"
              text="faculty_name"
              label="Faculty Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Institute Name"
              text="institute_name"
              label="Institute Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Session"
              text="session"
              label="Session"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter result"
              text="result"
              label="Result"
              register={register}
              errors={errors}
            />
            <div className="md:col-span-2">
              <Input
                placeholder="Enter subject"
                text="subject"
                label="Subject"
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

export default AddEducation;
