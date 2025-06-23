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
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "@/redux/api/articlesApi";
import { useGetAllArticleCategoriesQuery } from "@/redux/api/articleCategoriesApi";
import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";

const EditArticle = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: homAboutData,
    isLoading: fetchLoading,
    error,
    refetch,
  } = useGetSingleArticleQuery(id, { skip: !id });
  const router = useRouter();
  const [updateHomeAbout, { isLoading }] = useUpdateArticleMutation();
  const propertiesToRemove = ["article_category_name"];

  const { data: ArticleCategoriesData } = useGetAllArticleCategoriesQuery({});

  const articleCategoryDataData = ArticleCategoriesData?.data?.data;

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -

  const articleTitle = watch("article_title");

  useEffect(() => {
    if (articleTitle) {
      const slug = slugify(articleTitle);
      setValue("slug", slug);
    }
  }, [articleTitle, setValue]);

  const watchPhoto = watch("thumbnail");

  const currentPhoto =
    homAboutData?.data?.thumbnail &&
    process.env.NEXT_PUBLIC_IMAGE_PATH + homAboutData?.data?.thumbnail;

  const previewPhoto =
    watchPhoto instanceof File
      ? URL.createObjectURL(watchPhoto)
      : watchPhoto?.[0]
      ? URL.createObjectURL(watchPhoto[0])
      : null;

  const cacheBustedImage = currentPhoto + "?t=" + new Date().getTime();

  useEffect(() => {
    if (homAboutData) {
      const { articleCategory } = homAboutData?.data;

      if (articleCategory) {
        setValue("article_category_id", articleCategory?.id);
        setValue("article_category_name", articleCategory?.name);
      }

      setValue("article_title", homAboutData.data.article_title || "");
      setValue("article_title", homAboutData.data.article_title || "");
      setValue("slug", homAboutData.data.slug || "");
      setValue("article_tags", homAboutData.data.article_tags || "");
      setValue("publish_time", homAboutData.data.publish_time || "");
      setValue(
        "article_description",
        homAboutData.data.article_description || ""
      );
    }
  }, [homAboutData, setValue]);

  const onSubmit = async (data) => {
    console.log(data, "data...,,,..");
    try {
      propertiesToRemove?.forEach((property) => {
        delete data[property];
      });

      const formData = new FormData();
      formData.append("article_category_id", data.article_category_id);
      formData.append("article_title", data.article_title);
      formData.append("slug", data.slug);
      formData.append("article_tags", data.article_tags);
      formData.append("publish_time", data.publish_time);
      formData.append("article_description", data.article_description);
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail); // ✅ use the first file
      }

      const res = await updateHomeAbout({ id, data: formData }).unwrap(); // ✅ FIXED
      console.log("Updated article response:", res.data);

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
  useEffect(() => {
    if (id) refetch();
  }, [id]);

  if (fetchLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error?.message}</div>;
  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <div>
        <SectionTitle
          big_title={"Add Article "}
          link_one={"/"}
          title_one={"Home"}
          link_two={"/articles/articles/all-articles"}
          title_two={"All Article"}
          title_three={"Edit Article"}
          link_three={"/articles/articles/edit-article"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Home Hero Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            {/* Headline Input */}

            <SelectAndSearch
              options={articleCategoryDataData?.map((type) => ({
                id: type?.id,
                name: type?.name,
              }))}
              type_id={"article_category_id"}
              type_name={"article_category_name"}
              label="Select article category"
              placeholder="Select a article category"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"article category is required"}
            />
            <Input
              placeholder="Enter Your Article Title"
              text="article_title"
              label="Your  Article Title"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="slug"
              text="slug"
              label="slug"
              register={register}
              readOnly
              errors={errors}
            />

            <Input
              placeholder="Enter Article Tags"
              text="article_tags"
              label="Article Tags "
              required={false}
              register={register}
              errors={errors}
            />

            <div className="md:col-span-2">
              <Input
                placeholder="Enter Publish Time"
                text="publish_time"
                label="Publish Time"
                register={register}
                errors={errors}
              />
              <Textarea
                placeholder="Enter Description"
                text="article_description"
                label="Description"
                required={false}
                register={register}
                errors={errors}
              />
            </div>

            <div className="col-span-2">
              {/* Show Current Image if no new thumbnail is selected */}

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
                label="Change thumbnail"
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

export default EditArticle;
