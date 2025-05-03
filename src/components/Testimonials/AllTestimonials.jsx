"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import Image from "next/image";
import AccountPagination from "../common/AccountPagination/AccountPagination";
import EditIcon from "../common/EditIcon/EditIcon";
import DeleteIcon from "../common/DeleteIcon/DeleteIcon";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import TableSkeleton from "../common/Loading/TableSkeleton";
import {
  useDeleteTestimonialMutation,
  useGetAllTestimonialsQuery,
} from "@/redux/api/testimonialsApi";

const AllTestimonials = () => {
  const [searchValue, setSearchValue] = useState({
    search: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading, refetch } =
    useGetAllTestimonialsQuery(searchValue);
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  // Handler to update search query as user types
  const handleSearchChange = (e) => {
    setSearchValue({
      ...searchValue,
      search: e.target.value,
    });
    setSearchQuery(e.target.value);
  };

  // Filters companies based on the search query
  const filteredData = data?.data?.data;

  const handleDeleteFaq = async (testimonial) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the testimonial "${testimonial?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deleteTestimonial(testimonial?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The testimonial "${testimonial?.name}" has been successfully deleted.`,
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
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      {/* Table header */}
      <div className="flex items-center justify-between space-x-4">
        <div>
          <SectionTitle
            big_title={"All Testimonial"}
            link_one={"/"}
            title_one={"Home"}
            link_two={"/testimonials/all-testimonials"}
            title_two={"All Testimonial"}
            title_three={"Add Testimonial"}
            link_three={"/testimonials/add-testimonial"}
          />
        </div>
        {/* Search input with icon */}
        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-xs">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for..."
              className="bg-[#14151A]  border border-[#26272F] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>
          {/* Link to create a new company */}
          <Link href="/testimonials/add-testimonial">
            <button className="btn w-64">Add New</button>
          </Link>
        </div>
      </div>
      <div className="mx-auto w-full pt-4">
        <div className="overflow-x-auto w-full">
          <h1 className="table_header">All Testimonial</h1>
          <div className="table_section">
            <table className="w-full">
              <thead>
                <tr className="table_row">
                  <th className="table_th">ID</th>
                  <th className="table_th text-center">Photo</th>
                  <th className="table_th">Name</th>
                  <th className="table_th">Review</th>
                  <th className="table_th">Designation</th>
                  <th className="table_th">Message</th>
                  <th className="table_th text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={item?.id} className="tbody_tr">
                      <td className="table_th">{index + 1}</td>
                      <td className="table_th flex justify-center">
                        {item?.photo && (
                          <Image
                            className="rounded-md"
                            width={60}
                            height={60}
                            // To force the browser to re-fetch the image after an update, you can append a random query string (like a timestamp) to the image URL. That way, the URL becomes unique each time, and the browser treats it as a new image.
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_PATH +
                              item?.photo +
                              `?v=${new Date().getTime()}`
                            }
                            alt="photo"
                          />
                        )}
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.name, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{item?.review}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.designation, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.message, 30)}</p>
                      </td>
                      <td className="my-2 px-4 text-center ">
                        <div className="flex items-center justify-center w-full gap-4">
                          <EditIcon
                            edit_link={`/testimonials/edit-testimonial/${item?.id}`}
                          />
                          <DeleteIcon
                            handleDelete={handleDeleteFaq}
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
                      className="text-center py-6 text-red-600 text-2xl font-bold"
                    >
                      Not Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pb-5">
          {data?.data?.meta?.totalPages > 1 && (
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
    </section>
  );
};

export default AllTestimonials;
