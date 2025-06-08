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
import { useCreateExperiencesMutation } from "@/redux/api/experienceApi";
import { IoClose } from "react-icons/io5";

const AddExperience = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const router = useRouter();

  const [createExperience, { isLoading }] = useCreateExperiencesMutation();
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
      formData.append("title", data.title);
      formData.append("faculty_name", data.faculty_name);
      formData.append("institute_name", data.institute_name);
      formData.append("session", data.session);
      formData.append("position", data.position);
      formData.append("subject", data.subject);
      formData.append("duration", data.duration);
      formData.append("certificate_link", data.certificate_link);

      addSkills.forEach((skill) => {
        formData.append("skills", skill); // ✅ send each skill
      });

      formData.append("description", data.description);
      if (data.photo) {
        formData.append("photo", data.photo);
      }
      console.log(data, "data.......");

      const res = await createExperience(formData).unwrap();

      if (res?.success) {
        reset();
        setAddSkills([]);
        router.back();
        toast.success("Experience  added successfully!", {
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
        big_title={"Add Experience "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/home-page/experience/all-experiences"}
        title_two={"All Experience"}
        title_three={"Add Experience"}
        link_three={"/home-page/experience/add-experience"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Experience Step by Step</h1>
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
              placeholder="Enter Faculty Name"
              text="faculty_name"
              label="Faculty Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Institute Name"
              text="institute_name"
              label="Institute Name "
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Session"
              text="session"
              label="Session"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Position"
              text="position"
              label="Position"
              register={register}
              required={false}
              errors={errors}
            />
            <Input
              placeholder="Enter subject"
              text="subject"
              label="Subject"
              register={register}
              required={false}
              errors={errors}
            />
            <Input
              placeholder="Enter Duration"
              text="duration"
              label="Duration"
              register={register}
              required={false}
              errors={errors}
            />
            <Input
              placeholder="Enter Certificate Link"
              text="certificate_link"
              label="Certificate Link"
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
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills
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

export default AddExperience;
