"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import FetchLoading from "../common/Loading/FetchLoading";
import Input from "../common/Forms/Input";
import TableSkeleton from "../common/Loading/TableSkeleton";
import Image from "next/image";
import FileInput from "../common/FileInput/FileInput";
import {
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
} from "@/redux/api/testimonialsApi";
import Textarea from "../common/Textarea/Textarea";

const EditTestimonial = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: testimonialData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleTestimonialQuery(id);
  // const [previewImage, setPreviewImage] = useState(null);
  const [updateTestimonial, { isLoading }] = useUpdateTestimonialMutation();
  const router = useRouter();

  const watchPhoto = watch("photo");

  useEffect(() => {
    if (testimonialData) {
      setValue("designation", testimonialData.data.designation || "");
      setValue("name", testimonialData.data.name || "");
      setValue("review", testimonialData.data.review || "");
      setValue("message", testimonialData.data.message || "");
    }
  }, [testimonialData, setValue]);

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

      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateTestimonial({ id, data: formData }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Testimonial updated successfully!", {
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

  if (fetchLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error?.message}</div>;
  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <div>
        <SectionTitle
          big_title={"Edit Testimonial"}
          link_one={"/"}
          title_one={"Home"}
          link_two={"/testimonials/all-testimonials"}
          title_two={"All Testimonial"}
          link_three={`/testimonials/edit-testimonial/${id}`}
          title_three={"Edit Testimonial"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Testimonial Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid grid-cols-1 items-start gap-y-2 gap-x-4">
            {/* Headline Input */}
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

            {/* Show Current Image */}
            {!watchPhoto && testimonialData?.data?.photo && (
              <div className=" mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Photo
                </label>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_PATH +
                    testimonialData.data.photo
                  }
                  width={60}
                  height={60}
                  alt="Current FAQ"
                  className="w-40 h-auto rounded shadow"
                />
              </div>
            )}

            {/* Show Preview Image */}
            {watchPhoto && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Selected Photo
                </label>
                <Image
                  src={watchPhoto ? URL.createObjectURL(watchPhoto) : ""}
                  width={60}
                  height={60}
                  alt="Preview FAQ"
                  className="w-40 h-auto rounded shadow"
                />
              </div>
            )}

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

export default EditTestimonial;
