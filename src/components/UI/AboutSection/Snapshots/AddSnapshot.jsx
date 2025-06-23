"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";

import FetchLoading from "@/components/common/Loading/FetchLoading";

import FileInput from "@/components/common/FileInput/FileInput";

import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import { useCreateSnapshotsMutation } from "@/redux/api/snapshotsApi";
import { useGetAllSnapshotsCategoriesQuery } from "@/redux/api/snapshotCategoryApi";

const AddSnapshot = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();
  const router = useRouter();
  const [createSnapshot, { isLoading }] = useCreateSnapshotsMutation();
  const propertiesToRemove = ["snapshots_category_name"];

  const { data: SnapshotCategoriesData } = useGetAllSnapshotsCategoriesQuery(
    {}
  );

  const snapshotCategoryDataData = SnapshotCategoriesData?.data?.data;

  const onSubmit = async (data) => {
    try {
      propertiesToRemove?.forEach((property) => {
        delete data[property];
      });
      const formData = new FormData();
      formData.append("snapshots_category_id", data.snapshots_category_id);

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const res = await createSnapshot(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Snapshot  added successfully!", {
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
        big_title={"Add Snapshot "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/about-page/snapshots/all-snapshots"}
        title_two={"All Snapshot"}
        title_three={"Add Snapshot"}
        link_three={"/about-page/snapshots/add-snapshot"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Snapshot Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1  items-end gap-y-2 gap-x-5">
            <SelectAndSearch
              options={snapshotCategoryDataData?.map((type) => ({
                id: type?.id,
                name: type?.title,
              }))}
              type_id={"snapshots_category_id"}
              type_name={"snapshots_category_name"}
              label="Select snapshots category"
              placeholder="Select a snapshots category"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"snapshots category is required"}
            />

            <div className="md:col-span-2">
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

export default AddSnapshot;
