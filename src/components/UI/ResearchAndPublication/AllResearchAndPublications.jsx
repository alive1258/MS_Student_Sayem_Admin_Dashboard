"use client";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import EditIcon from "@/components/common/EditIcon/EditIcon";
import DeleteIcon from "@/components/common/DeleteIcon/DeleteIcon";
import AccountPagination from "@/components/common/AccountPagination/AccountPagination";
import NotFound from "@/components/common/NotFound/NotFound";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import {
  useDeleteResearchAndPublicationMutation,
  useGetAllResearchAndPublicationsQuery,
} from "@/redux/api/researchAndPublicationsApi";

const AllResearchAndPublications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const debouncedQuery = useDebounce(searchQuery);

  const query = {
    search: debouncedQuery,
    ...searchValue,
  };

  const { data, error, isLoading, refetch } =
    useGetAllResearchAndPublicationsQuery(query);
  const [deleteResearchAndPublications] =
    useDeleteResearchAndPublicationMutation();

  // Filters experience based on the search query
  const filteredData = data?.data?.data;

  const handleDeleteResearchAndPublications = async (experience) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the experience "${experience?.faculty_name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deleteResearchAndPublications(
          experience?.id
        ).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The experience "${experience?.faculty_name}" has been successfully deleted.`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `${response?.message}`,
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${error.data || error.message}`,
        icon: "error",
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return <TableSkeleton />;
  }

  // Render error state if there was an error fetching data
  if (error) {
    return (
      <div className="flex h-[85vh] w-full items-center justify-center">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="md:px-6  p-4 pb-4 rounded-lg">
      <div className="bg-[#0D0E12] sticky top-[75px] md:top-[82px] z-[450] py-2 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
          <div className="w-full">
            <SectionTitle
              big_title={"All Research And Publications"}
              link_one={"/"}
              title_one={"Research And Publications"}
              title_two={"All Research And Publications"}
              link_two={
                "/research-and-publications/all-research-and-publications"
              }
            />
          </div>
          {/* Search input with icon */}
          <div className="flex items-center w-full justify-between md:justify-end gap-4">
            <div className="relative w-full max-w-xs">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for..."
                className="text-[14px] bg-[#14151A]  border border-[#26272F] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
            </div>
            {/* Link to create a new company */}
            <Link href="/research-and-publications/add-research-and-publication">
              <button className="btn w-[150px] md:w-64">
                Add Research And Publications
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full pt-2 mt-6">
        <h1 className="table_header">All Research And Publications</h1>
        <div className="overflow-x-auto w-full">
          <div className="table_section">
            <table className="w-full">
              <thead>
                <tr className="table_row ">
                  <th className="table_th w-4">#SL</th>
                  <th className="table_th">Thumbnail</th>
                  <th className="table_th">Title</th>
                  <th className="table_th">Publisher</th>
                  <th className="table_th">Journal</th>
                  <th className="table_th">Doi</th>
                  <th className="table_th">Paper Link</th>

                  <th className="table_th text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={index} className="tbody_tr">
                      <td className="table_th">{index + 1}</td>
                      <td className="table_th flex justify-center">
                        {item?.thumbnail && (
                          <Image
                            className=""
                            width={60}
                            height={60}
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_PATH +
                              item?.thumbnail +
                              `?v=${new Date().getTime()}`
                            }
                            // To force the browser to re-fetch the image after an update, you can append a random query string (like a timestamp) to the image URL. That way, the URL becomes unique each time, and the browser treats it as a new image.
                            // src={
                            //   process.env.NEXT_PUBLIC_IMAGE_PATH +
                            //   item?.thumbnail +
                            //   `?v=${new Date().getTime()}`
                            // }
                            alt="thumbnail"
                          />
                        )}
                      </td>
                      <td className="table_th ">
                        <p>{truncateCharacters(item?.title, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.publisher, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.journal, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.doi, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.paper_link, 30)}</p>
                      </td>

                      <td className="my-2 px-4 text-center ">
                        <div className="flex items-center justify-center w-full gap-2">
                          <EditIcon
                            edit_link={`/research-and-publications/edit-research-and-publication/${item?.id}`}
                          />
                          <DeleteIcon
                            handleDelete={handleDeleteResearchAndPublications}
                            item={item}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Display message when no companies match the search criteria
                  <tr>
                    <td
                      colSpan="10"
                      className="bg-black-base text-center py-6 text-red-600 text-2xl font-bold"
                    >
                      <NotFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          {data?.data?.meta?.totalPages > 0 && (
            <AccountPagination
              refetch={refetch}
              total={data?.data?.meta?.total}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              totalPage={data?.data?.meta?.totalPages}
              limit={data?.data?.meta?.limit}
              page={data?.data?.meta?.page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllResearchAndPublications;
