"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import Textarea from "@/components/common/Textarea/Textarea";
import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import FetchLoading from "@/components/common/Loading/FetchLoading";

import { useGetAllProjectsQuery } from "@/redux/api/projectsApi";
import {
  useGetSingleProjectDetailQuery,
  useUpdateProjectDetailMutation,
} from "@/redux/api/projectDetailsApi";

const EditProjectDetail = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const router = useRouter();

  const {
    data: projectDetailsData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleProjectDetailQuery(id, { skip: !id });

  const [updateProjectDetail, { isLoading }] = useUpdateProjectDetailMutation();
  const { data: ProjectData } = useGetAllProjectsQuery({});

  const projectData = useMemo(
    () => ProjectData?.data?.data || [],
    [ProjectData]
  );

  const [pointsInput, setPointsInput] = useState("");
  const [addPoints, setAddPoints] = useState([]);
  const [updatedImages, setUpdatedImages] = useState({});
  const [newImages, setNewImages] = useState([]);

  const existingImages = useMemo(() => {
    const photos = projectDetailsData?.data?.photo;
    if (Array.isArray(photos)) return photos;
    if (typeof photos === "string") return [photos];
    return [];
  }, [projectDetailsData]);

  const mergedImages = existingImages.map(
    (img, index) => updatedImages[index] || img
  );

  const handleReplaceImage = (e, index) => {
    const file = e.target.files[0];
    if (file) setUpdatedImages((prev) => ({ ...prev, [index]: file }));
  };

  const handleAddNewImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) setNewImages((prev) => [...prev, ...files]);
  };

  const handleAddPoint = (e) => {
    e.preventDefault();
    if (pointsInput.trim()) {
      setAddPoints((prev) => [...prev, pointsInput.trim()]);
      setPointsInput("");
    }
  };

  const removePoint = (index) => {
    setAddPoints((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (projectDetailsData && projectData.length > 0) {
      const exp = projectDetailsData.data;

      const selectedProject = projectData.find(
        (project) => project.id === exp.project_id
      );

      if (selectedProject) {
        setValue("project_id", selectedProject.id);
        setValue("project_name", selectedProject.project_title);
      }

      setValue("title", exp.title || "");
      setValue("description", exp.description || "");
      setAddPoints(exp.points || []);
    }
  }, [projectDetailsData, projectData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("project_id", data.project_id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      addPoints.forEach((point) => formData.append("points", point));

      existingImages.forEach((img, index) => {
        if (updatedImages[index] instanceof File) {
          formData.append("files", updatedImages[index]);
        }
        // else skip, since backend already has the image
      });

      newImages.forEach((file) => {
        formData.append("files", file);
      });

      const res = await updateProjectDetail({ id, data: formData }).unwrap();
      if (res?.success) {
        toast.success("Project detail updated successfully!");
        router.back();
        refetch();
      } else {
        toast.error(res.message || "Failed to update.");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong.");
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

      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SelectAndSearch
            options={projectData.map((type) => ({
              id: type.id,
              name: type.project_title,
            }))}
            type_id="project_id"
            type_name="project_name"
            label="Select Project"
            placeholder="Select a project"
            register={register}
            required
            setValue={setValue}
            errors={errors}
            message="Project is required"
          />

          <Input
            placeholder="Enter Project Title"
            text="title"
            label="Project Title"
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
            <h1 className="text-lg text-gray-500 mt-2">
              Updating an image will replace the existing one. Adding images
              will show them along with the existing ones.
            </h1>

            {/* Image Preview */}
            {mergedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {mergedImages.map((img, index) => (
                  <div key={index} className="relative border p-1 rounded">
                    {img instanceof File ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Updated ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <Image
                        width={250}
                        height={150}
                        src={`${
                          process.env.NEXT_PUBLIC_IMAGE_PATH
                        }${img}?v=${Date.now()}`}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}

                    <label className="text-xs text-blue-600 block mt-1 cursor-pointer">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleReplaceImage(e, index)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Images */}
            <div className="mt-4">
              <label className="text-sm font-medium block mb-1">
                Add More Images
              </label>
              <input
                type="file"
                multiple
                className="input_style"
                onChange={handleAddNewImages}
              />
            </div>

            {/* New Images Preview */}
            {newImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {newImages.map((file, index) => (
                  <div key={index} className="relative border p-1 rounded">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-xs mt-1 break-words">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium">Points</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={pointsInput}
                onChange={(e) => setPointsInput(e.target.value)}
                placeholder="Enter a point"
                className="input_style"
              />
              <button
                onClick={handleAddPoint}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {addPoints.map((point, index) => (
                <div key={index} className="group relative w-fit">
                  <button className="input_style w-full relative">
                    <span className="group-hover:invisible">{point}</span>
                    <IoClose
                      onClick={() => removePoint(index)}
                      className="absolute inset-0 p-2 text-white bg-red-600 rounded-md opacity-0 group-hover:opacity-100 transition"
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
    </section>
  );
};

export default EditProjectDetail;
