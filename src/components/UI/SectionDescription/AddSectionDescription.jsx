"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import { useCreateSectionDescriptionsMutation } from "@/redux/api/sectionDescriptionApi";
import Textarea from "@/components/common/Forms/Textarea";

const AddSectionDescription = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();

  const [createSectionDescription, { isLoading }] =
    useCreateSectionDescriptionsMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createSectionDescription(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("SectionDescription added successfully!", {
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
        big_title={"Add SectionDescription "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/section-description/all-section-descriptions"}
        title_two={"All SectionDescription"}
        title_three={"Add SectionDescription"}
        link_three={"/section-description/add-section-description"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">
          Create SectionDescription Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Title"
              text="title"
              label="Title"
              register={register}
              errors={errors}
            />
            <Textarea
              placeholder="Enter Description"
              text="description"
              label="Description"
              required={false}
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

export default AddSectionDescription;
