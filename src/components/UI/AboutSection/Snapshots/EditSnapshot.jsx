"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import FileInput from "@/components/common/FileInput/FileInput";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import {
  useGetSingleSnapshotQuery,
  useUpdateSnapshotMutation,
} from "@/redux/api/snapshotsApi";
import { useGetAllSnapshotsCategoriesQuery } from "@/redux/api/snapshotCategoryApi";

const EditSnapshot = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: snapshotData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleSnapshotQuery(id, { skip: !id });
  const router = useRouter();
  const [updateHomeAbout, { isLoading }] = useUpdateSnapshotMutation();
  const propertiesToRemove = ["snapshots_category_title"];

  const { data: SnapshotCategoriesData } = useGetAllSnapshotsCategoriesQuery(
    {}
  );

  const snapshotCategoryDataData = SnapshotCategoriesData?.data?.data;

  const watchPhoto = watch("photo");

  console.log(snapshotData, "snapshotData");
  const currentPhoto =
    snapshotData?.data?.photo &&
    process.env.NEXT_PUBLIC_IMAGE_PATH + snapshotData?.data?.photo;

  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;

  const cacheBustedImage = currentPhoto + "?t=" + new Date().getTime();

  useEffect(() => {
    if (snapshotData) {
      const { snapshotsCategory } = snapshotData?.data;

      if (snapshotsCategory) {
        setValue("snapshots_category_id", snapshotsCategory?.id);
        setValue("snapshots_category_title", snapshotsCategory?.title);
      }
    }
  }, [snapshotData, setValue]);

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
      const res = await updateHomeAbout({ id, data: formData }).unwrap(); // ✅ FIXED

      if (res?.success) {
        router.back();
        toast.success("Home About updated successfully!", {
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
          big_title={"Edit Snapshot "}
          link_one={"/"}
          title_one={"Home"}
          link_two={"/about-page/snapshot/all-snapshots"}
          title_two={"All Snapshot"}
          title_three={"Edit Snapshot"}
          link_three={"/about-page/snapshot/edit-snapshot"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">
          Edit snapshot category Step by Step
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 items-end gap-y-2 gap-x-5">
            {/* Headline Input */}

            <SelectAndSearch
              options={snapshotCategoryDataData?.map((type) => ({
                id: type?.id,
                name: type?.title,
              }))}
              type_id={"snapshots_category_id"}
              type_name={"snapshots_category_title"}
              label="Select snapshot category"
              placeholder="Select a snapshot category"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"snapshot category is required"}
            />

            <div className="col-span-2">
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

export default EditSnapshot;
