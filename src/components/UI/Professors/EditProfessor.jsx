"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FileInput from "@/components/common/FileInput/FileInput";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import Textarea from "@/components/common/Textarea/Textarea";
import { IoClose } from "react-icons/io5";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import {
  useGetSingleProfessorQuery,
  useUpdateProfessorMutation,
} from "@/redux/api/professorsApi";

const EditProfessor = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const router = useRouter();
  const {
    data: aboutMeData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleProfessorQuery(id, { skip: !id });

  const [updateAboutMe, { isLoading }] = useUpdateProfessorMutation();
  const [skillInput, setSkillInput] = useState("");
  const [addSkills, setAddSkills] = useState([]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim()) {
      setAddSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = ({ e, index }) => {
    e.preventDefault();
    setAddSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const watchPhoto = watch("photo");

  const currentPhoto =
    aboutMeData?.data?.photo &&
    `${process.env.NEXT_PUBLIC_IMAGE_PATH}${aboutMeData?.data?.photo}`;
  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;
  const cacheBustedImage =
    currentPhoto && currentPhoto + "?t=" + new Date().getTime();

  useEffect(() => {
    if (aboutMeData) {
      const exp = aboutMeData.data;

      setValue("professor_name", exp.professor_name || "");
      setValue("institute", exp.institute || "");
      setValue("title", exp.title || "");
      setValue("department", exp.department || "");
      setValue("description", exp.description || "");
      setAddSkills(exp.research_subject_title || []);
    }
  }, [aboutMeData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("professor_name", data.professor_name);
      formData.append("description", data.description);
      formData.append("title", data.title);
      formData.append("institute", data.institute);
      formData.append("department", data.department);

      addSkills.forEach((skill) => {
        formData.append("research_subject_title", skill);
      });

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const res = await updateAboutMe({ id, data: formData }).unwrap();

      if (res?.success) {
        toast.success("AboutMe updated successfully!");
        router.back();
        refetch();
      } else {
        toast.error(res.message || "Failed to update aboutMe.");
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
        title_three="Edit AboutMe"
        big_title={"Add Professor "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/about-page/about-me/all-about-me"}
        title_two={"All Professor"}
        link_three={`/about-page/about-me/edit-about-me/${id}`}
      />

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit AboutMe Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              placeholder="Enter Your professor_name"
              text="professor_name"
              label="Your professor_name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Your title"
              text="title"
              label="Your title"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter institute"
              text="institute"
              label="institute"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter department"
              text="department"
              label="department"
              register={register}
              required={false}
              errors={errors}
            />

            <div className="lg:col-span-2">
              <Textarea
                label="Description"
                text="description"
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

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Research Subject Title
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Enter a skill"
                  className="input_style flex-1"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {addSkills?.map((skill, index) => (
                  <div key={index} className="group relative w-fit">
                    <button className="input_style w-full flex items-center justify-center relative">
                      <span className="group-hover:invisible">{skill}</span>
                      <IoClose
                        onClick={(e) => removeSkill({ e, index })}
                        className="w-full h-full absolute inset-0 p-2 cursor-pointer flex items-center justify-center text-white bg-red-600 rounded-md transition-opacity opacity-0 group-hover:opacity-100"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <button disabled={isLoading} className="btn" type="submit">
                {isLoading ? <FetchLoading /> : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfessor;
