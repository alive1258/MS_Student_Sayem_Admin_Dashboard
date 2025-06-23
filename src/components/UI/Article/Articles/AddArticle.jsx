"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import Input from "@/components/common/Forms/Input";
import FetchLoading from "@/components/common/Loading/FetchLoading";
import Textarea from "@/components/common/Textarea/Textarea";
import FileInput from "@/components/common/FileInput/FileInput";

import SelectAndSearch from "@/components/common/SelectAndSearch/SelectAndSearch";
import { useCreateArticlesMutation } from "@/redux/api/articlesApi";
import { useGetAllArticleCategoriesQuery } from "@/redux/api/articleCategoriesApi";

const AddArticle = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();
  const router = useRouter();
  const [createArticle, { isLoading }] = useCreateArticlesMutation();
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

  const onSubmit = async (data) => {
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
        formData.append("thumbnail", data.thumbnail);
      }

      const res = await createArticle(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Article  added successfully!", {
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
        big_title={"Add Article "}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/articles/articles/all-articles"}
        title_two={"All Article"}
        title_three={"Add Article"}
        link_three={"/articles/articles/add-article"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Article Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid grid-cols-1 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
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
              <FileInput
                placeholder="Choose File"
                text="thumbnail"
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

export default AddArticle;
