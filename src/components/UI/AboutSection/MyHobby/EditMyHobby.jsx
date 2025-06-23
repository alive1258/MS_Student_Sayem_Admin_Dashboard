"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FileInput from "@/components/common/FileInput/FileInput";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import Textarea from "@/components/common/Textarea/Textarea";
import {
  useGetSingleMyHobbyQuery,
  useUpdateMyHobbyMutation,
} from "@/redux/api/myHobbiesApi";

const EditMyHobby = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  const {
    data: homHeroData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleMyHobbyQuery(id, { skip: !id });
  const [updateMyHobby, { isLoading }] = useUpdateMyHobbyMutation();

  const router = useRouter();
  const watchPhoto = watch("photo");

  const currentPhoto =
    homHeroData?.data?.photo &&
    process.env.NEXT_PUBLIC_IMAGE_PATH + homHeroData?.data?.photo;

  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;

  // const cacheBustedImage = currentPhoto + "?t=" + new Date().getTime();
  const cacheBustedImage = currentPhoto
    ? `${currentPhoto}?t=${new Date().getTime()}`
    : null;

  useEffect(() => {
    if (homHeroData) {
      setValue("title", homHeroData.data.title || "");

      setValue("description", homHeroData.data.description || "");
    }
  }, [homHeroData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      // if (data.photo && data.photo.length > 0) {
      //   formData.append("photo", data.photo[0]);
      // }
      const res = await updateMyHobby({ id, data: formData }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("My Hobby updated successfully!", {
          position: toast.TOP_RIGHT,
        });
        refetch();
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };
  // Sometimes browser caches the image and doesn’t refetch it even if it's updated. To fix this, add a query param:
  // useEffect(() => {
  //   if (id) refetch();
  // }, [id]);

  if (fetchLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error?.message}</div>;
  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <div>
        <SectionTitle
          big_title={"Edit My Hobby"}
          title_one={"Home"}
          link_one={"/"}
          title_two={"All My Hobby"}
          link_two={"/about-page/my-hobby/all-my-hobbies"}
          link_three={`/about-page/my-hobby/all-my-hobby/${id}`}
          title_three={"Edit My Hobby"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit My Hobby Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            {/* Headline Input */}
            <Input
              placeholder="Enter Your Name"
              text="title"
              label="Your Name"
              register={register}
              errors={errors}
            />

            <div className="col-span-2">
              <Textarea
                placeholder="Enter Description"
                text="description"
                label="Description"
                required={false}
                register={register}
                errors={errors}
              />

              {/* Show Current Image if no new photo is selected */}

              {(previewPhoto || cacheBustedImage) && (
                <div className="col-span-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {previewPhoto ? "New Selected Photo" : "Current Photo"}
                  </label>
                  <Image
                    src={previewPhoto || cacheBustedImage}
                    width={250}
                    height={150}
                    alt="Preview"
                    className="rounded object-cover shadow"
                  />
                </div>
              )}

              <FileInput
                placeholder="Choose File"
                text="photo"
                label="Change photo"
                register={register}
                required={false}
                setValue={setValue}
                errors={errors}
              />
            </div>
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

export default EditMyHobby;
