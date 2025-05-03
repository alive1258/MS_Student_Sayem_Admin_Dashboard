"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FetchLoading from "../common/Loading/FetchLoading";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { useCreateFaqsMutation } from "@/redux/api/faqsApi";
import FileInput from "../common/FileInput/FileInput";
import Input from "../common/Forms/Input";

const AddFaq = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const router = useRouter();
  const [createFaq, { isLoading }] = useCreateFaqsMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("headline", data.headline);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const res = await createFaq(formData).unwrap();

      if (res?.success) {
        toast.success("Faq added successfully!");
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
        big_title={"Add Faqs"}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/faqs/all-faqs"}
        title_two={"All Faqs"}
        title_three={"Add Faqs"}
        link_three={"/faqs/add-faq"}
      />

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Create Faq Step by Step</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid sm:grid-cols-1 gap-y-4 gap-x-4">
            <Input
              placeholder="Enter headline"
              text="headline"
              label="headline"
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

export default AddFaq;
