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
import { useGetAllProjectsQuery } from "@/redux/api/projectsApi";

import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import { useCreateProjectDetailDetailsMutation } from "@/redux/api/projectDetailsApi";

const EditProjectDetail = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm();

  const router = useRouter();

  const { data: ProjectData } = useGetAllProjectsQuery({});
  const projectData = ProjectData?.data?.data;
  const [createExperience, { isLoading }] =
    useCreateProjectDetailDetailsMutation();
  const [pointsInput, setPointsInput] = useState("");
  const [addPoints, setAddPoints] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const propertiesToRemove = ["project_name"];
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (pointsInput.trim()) {
      setAddPoints((prev) => [...prev, pointsInput.trim()]);
      setPointsInput("");
    }
  };

  const removePoint = ({ e, index }) => {
    e.preventDefault();
    setAddPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const existing = [...selectedFiles];
      const newFiles = Array.from(files);

      const combined = [...existing, ...newFiles];
      setSelectedFiles(combined);

      const dt = new DataTransfer();
      combined.forEach((file) => dt.items.add(file));
      setValue("files", dt.files);
    }
  };

  const handleRemoveImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    const dt = new DataTransfer();
    newFiles.forEach((file) => dt.items.add(file));
    setValue("files", dt.files);
  };

  const onSubmit = async (data) => {
    propertiesToRemove?.forEach((property) => {
      delete data[property];
    });
    try {
      const formData = new FormData();
      formData.append("project_id", data.project_id);
      formData.append("title", data.title);
      formData.append("description", data.description);

      addPoints.forEach((point) => {
        formData.append("points", point);
      });

      if (data.files && data.files.length > 0) {
        Array.from(data.files).forEach((file) => {
          formData.append("files", file);
        });
      }

      const res = await createExperience(formData).unwrap();

      if (res?.success) {
        toast.success("Project Add successfully!");

        reset();
        setAddPoints([]);
        router.back();
      } else {
        toast.error(res.message || "Failed to update.");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong.");
    }
  };

  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <SectionTitle
        big_title="Add Project"
        title_one="Dashboard"
        link_one="/"
        title_two="All Projects"
        link_two="/projects/project-details/all-project-details"
        title_three="Add project details"
        link_three={`/projects/project-details/add-project-detail`}
      />

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Add Project Details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SelectAndSearch
              options={projectData?.map((type) => ({
                id: type?.id,
                name: type?.project_title,
              }))}
              type_id={"project_id"}
              type_name={"project_name"}
              label="Select project"
              placeholder="Select a project"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message="Project is required"
            />
            <Input
              placeholder="Enter Title"
              text="title"
              label="Title"
              register={register}
              errors={errors}
            />

            <div className="lg:col-span-2">
              <Textarea
                label="Description"
                text="description"
                register={register}
                errors={errors}
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload New Photos
                </label>
                <input
                  type="file"
                  multiple
                  className="input_style"
                  onChange={handleFileUpload}
                />

                {selectedFiles.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative rounded border p-1 shadow text-sm text-gray-700"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-32 object-cover rounded"
                        />
                        <p className="mt-1 text-xs break-all">{file.name}</p>
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <IoClose className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="text"
                  value={pointsInput}
                  onChange={(e) => setPointsInput(e.target.value)}
                  placeholder="Enter point"
                  className="input_style"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {addPoints?.map((point, index) => (
                  <div key={index} className="group relative w-fit">
                    <button className="input_style relative flex items-center justify-center">
                      <span className="group-hover:invisible">{point}</span>
                      <IoClose
                        onClick={(e) => removePoint({ e, index })}
                        className="w-full h-full absolute inset-0 p-2 cursor-pointer flex items-center justify-center text-white bg-red-600 rounded-md transition-opacity opacity-0 group-hover:opacity-100"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <button disabled={isLoading} className="btn" type="submit">
                {isLoading ? <FetchLoading /> : "Update Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProjectDetail;
