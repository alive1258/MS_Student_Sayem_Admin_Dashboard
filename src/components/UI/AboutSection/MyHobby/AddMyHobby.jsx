"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateMyHobbysMutation } from "@/redux/api/homeHeroApi";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import Textarea from "@/components/common/Textarea/Textarea";
import FileInput from "@/components/common/FileInput/FileInput";
import { useCreateMyHobbiesMutation } from "@/redux/api/myHobbiesApi";

const AddMyHobby = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const router = useRouter();

  const [createMyHobby, { isLoading }] = useCreateMyHobbiesMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const res = await createMyHobby(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Home Hero  added successfully!", {
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
        big_title={"Add My Hobby "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/about-page/my-hobby/all-my-hobbies"}
        title_two={"All My Hobby"}
        title_three={"Add My Hobby"}
        link_three={"/about-page/my-hobby/add-my-hobby"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create My Hobby Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1  items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Your Name"
              text="title"
              label="Your Name"
              register={register}
              errors={errors}
            />
            <div className="md:col-span-2">
              <Textarea
                placeholder="Enter Description"
                text="description"
                label="Description"
                required={false}
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

export default AddMyHobby;
