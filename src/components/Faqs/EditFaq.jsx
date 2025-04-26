"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
} from "@/redux/api/faqsApi";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import FetchLoading from "../common/Loading/FetchLoading";
import Input from "../common/Forms/Input";
import TableSkeleton from "../common/Loading/TableSkeleton";
import Image from "next/image";
import FileInput from "../common/FileInput/FileInput";

const EditFaq = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: faqData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleFaqQuery(id);
  // const [previewImage, setPreviewImage] = useState(null);
  const [updateFaq, { isLoading }] = useUpdateFaqMutation();
  const router = useRouter();

  const watchPhoto = watch("photo");

  useEffect(() => {
    if (faqData) {
      setValue("headline", faqData.data.headline || "");
    }
  }, [faqData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("headline", data.headline);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateFaq({ id, data: formData }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Faq updated successfully!", {
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
          big_title={"Edit Faq"}
          link_one={"/"}
          title_one={"Home"}
          link_two={"/faqs/all-faqs"}
          title_two={"All Faq"}
          link_three={`/faqs/edit-faq/${id}`}
          title_three={"Edit Faq"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Faq Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid sm:grid-cols-2 items-start gap-y-2 gap-x-4">
            {/* Headline Input */}
            <Input
              placeholder="Enter headline"
              text="headline"
              label="headline"
              register={register}
              errors={errors}
            />

            {/* Show Current Image */}
            {!watchPhoto && faqData?.data?.photo && (
              <div className="col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Photo
                </label>
                <Image
                  src={process.env.NEXT_PUBLIC_IMAGE_PATH + faqData.data.photo}
                  width={60}
                  height={60}
                  alt="Current FAQ"
                  className="w-40 h-auto rounded shadow"
                />
              </div>
            )}

            {/* Show Preview Image */}
            {watchPhoto && (
              <div className="col-span-2 mb-4">
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

export default EditFaq;
