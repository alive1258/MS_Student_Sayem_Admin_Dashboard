"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import FileInput from "@/components/common/FileInput/FileInput";
import { IoClose } from "react-icons/io5";
import { useCreateResearchAndPublicationsMutation } from "@/redux/api/researchAndPublicationsApi";

const AddResearchAndPublication = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const router = useRouter();

  const [createResearchAndPublication, { isLoading }] =
    useCreateResearchAndPublicationsMutation();
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

      const res = await createResearchAndPublication(formData).unwrap();

      if (res?.success) {
        reset();
        setAddTags([]);
        router.back();
        toast.success("Research And Publication added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <section className="md:px-6 px-4 mt-6 pb-4 rounded-lg">
      <SectionTitle
        big_title={"Add ResearchAndPublication "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/research-and-publications/all-research-and-publications"}
        title_two={"All Research And Publication"}
        title_three={"Add ResearchAndPublication"}
        link_three={"/research-and-publications/add-research-and-publication"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">
          Create Research And Publication Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
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
            <Input
              placeholder="Enter Paper Link"
              text="paper_link"
              label="Paper Link"
              register={register}
              required={false}
              errors={errors}
            />
            <FileInput
              placeholder="Choose File"
              text="thumbnail"
              label="Upload Photo"
              register={register}
              required={false}
              setValue={setValue}
              errors={errors}
            />

            <div className="md:col-span-2">
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

export default AddResearchAndPublication;
