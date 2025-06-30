"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import Textarea from "@/components/common/Textarea/Textarea";
import FileInput from "@/components/common/FileInput/FileInput";
import { IoClose } from "react-icons/io5";
import { useCreateProfessorsMutation } from "@/redux/api/professorsApi";

const AddProfessor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const router = useRouter();

  const [createProfessor, { isLoading }] = useCreateProfessorsMutation();
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

      const res = await createProfessor(formData).unwrap();

      if (res?.success) {
        reset();
        setAddSkills([]);
        router.back();
        toast.success("Professor  added successfully!", {
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
        big_title={"Add Professor "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/about-page/about-me/all-about-me"}
        title_two={"All Professor"}
        title_three={"Add Professor"}
        link_three={"/about-page/about-me/add-about-me"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Professor Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
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
              <div>
                <label
                  htmlFor="research_subject_title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Research Subject Title
                </label>
                <div className="flex space-x-2 mt-1">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Enter skills"
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

export default AddProfessor;
