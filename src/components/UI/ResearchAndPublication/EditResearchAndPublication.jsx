"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FileInput from "@/components/common/FileInput/FileInput";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import { IoClose } from "react-icons/io5";
import {
  useGetSingleResearchAndPublicationQuery,
  useUpdateResearchAndPublicationMutation,
} from "@/redux/api/researchAndPublicationsApi";
import Image from "next/image";
import FetchLoading from "@/components/common/Loading/FetchLoading";

const EditResearchAndPublication = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const router = useRouter();
  const {
    data: researchAndPublicationData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleResearchAndPublicationQuery(id, { skip: !id });

  const [updateExperience, { isLoading }] =
    useUpdateResearchAndPublicationMutation();
  const [tagInput, setTagInput] = useState("");
  const [addTags, setAddTags] = useState([]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (tagInput.trim()) {
      setAddTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeSkill = ({ e, index }) => {
    e.preventDefault();
    setAddTags((prev) => prev.filter((_, i) => i !== index));
  };

  const watchPhoto = watch("thumbnail");

  const currentPhoto =
    researchAndPublicationData?.data?.thumbnail &&
    `${process.env.NEXT_PUBLIC_IMAGE_PATH}${researchAndPublicationData?.data?.thumbnail}`;
  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;
  const cacheBustedImage =
    currentPhoto && currentPhoto + "?t=" + new Date().getTime();

  useEffect(() => {
    if (researchAndPublicationData) {
      const exp = researchAndPublicationData.data;

      setValue("title", exp.title || "");

      setValue("publisher", exp.publisher || "");
      setValue("journal", exp.journal || "");
      setValue("doi", exp.doi || "");
      setValue("paper_link", exp.paper_link || "");

      setAddTags(exp.tags || []);
    }
  }, [researchAndPublicationData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      data.tags = addTags;

      Object.entries(data).forEach(([key, value]) => {
        if (key === "tags") {
          addTags.forEach((tag) => {
            formData.append("tags", tag);
          });
        } else {
          formData.append(key, value);
        }
      });

      const res = await updateExperience({ id, data: formData }).unwrap();

      if (res?.success) {
        toast.success("Experience updated successfully!");
        router.back();
        refetch();
      } else {
        toast.error(res.message || "Failed to update experience.");
      }
    } catch (err) {
      toast.error(err?.message || "An error occurred while updating.");
    }
  };

  if (fetchLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <SectionTitle
        big_title="Edit Experience"
        title_one="Dashboard"
        link_one="/"
        title_two="All Experiences"
        link_two="/experience/all"
        link_three={`/experience/edit/${id}`}
        title_three="Edit Experience"
      />

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Experience Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Your title"
              text="title"
              label="Your title"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter publisher Name"
              text="publisher"
              label="publisher Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter journal Name"
              text="journal"
              label="journal Name "
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter doi"
              text="doi"
              label="doi"
              register={register}
              errors={errors}
            />

            <div className="md:col-span-2">
              <Input
                placeholder="Enter Paper Link"
                text="paper_link"
                label="Paper Link"
                register={register}
                required={false}
                errors={errors}
              />
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
                text="thumbnail"
                label="Upload Photo"
                register={register}
                required={false}
                setValue={setValue}
                errors={errors}
              />
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <div className="flex space-x-2 mt-1">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tags"
                    className="input_style"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {addTags?.map((tag, index) => (
                    <div key={index} className="group relative w-fit">
                      <button className="input_style w-full flex items-center justify-center relative">
                        <span className="group-hover:invisible">{tag}</span>
                        <IoClose
                          onClick={(e) => removeSkill({ e, index })}
                          className="w-full h-full absolute inset-0 p-2 cursor-pointer flex items-center justify-center text-white bg-red-600 rounded-md transition-opacity opacity-0 group-hover:opacity-100"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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

export default EditResearchAndPublication;
