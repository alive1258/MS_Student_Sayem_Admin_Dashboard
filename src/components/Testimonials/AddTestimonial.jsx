"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FetchLoading from "../common/Loading/FetchLoading";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import FileInput from "../common/FileInput/FileInput";
import Input from "../common/Forms/Input";
import { useCreateTestimonialsMutation } from "@/redux/api/testimonialsApi";

import Textarea from "../common/Textarea/Textarea";
import NumberInput from "../common/PosNumberInput/PosNumberInput";

const AddTestimonial = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const router = useRouter();
  const [createTestimonial, { isLoading }] = useCreateTestimonialsMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("designation", data.designation);
      formData.append("name", data.name);
      formData.append("review", Number(data.review));
      formData.append("message", data.message);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const res = await createTestimonial(formData).unwrap();

      if (res?.success) {
        toast.success("Testimonial added successfully!");
        reset();
        router.back();
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.message ?? "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <SectionTitle
        big_title={"Add Testimonial"}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/testimonials/all-testimonials"}
        title_two={"All Testimonial"}
        title_three={"Add Testimonial"}
        link_three={"/testimonials/add-testimonial"}
      />

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Create Testimonial Step by Step</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid sm:grid-cols-1 gap-y-4 gap-x-4">
            <Input
              placeholder="Enter Name"
              text="name"
              label="Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Designation"
              text="designation"
              label="Designation"
              register={register}
              errors={errors}
            />

            <FileInput
              placeholder="Choose File"
              text="photo"
              label="Upload Photo"
              register={register}
              required={false}
              setValue={setValue}
              errors={errors}
            />
            <Input
              placeholder="Enter review"
              text="review"
              label="review"
              register={register}
              errors={errors}
            />

            <Textarea
              placeholder="Write your custom message."
              text="message"
              label="Message"
              register={register}
              errors={errors}
            />
          </div>

          <div className="pt-4">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? <FetchLoading /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTestimonial;
