"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";
import TableSkeleton from "../common/Loading/TableSkeleton";
import SectionEditIcon from "../common/SectionEditIcon/SectionEditIcon";
import SectionDeleteIcon from "../common/SectionDeleteIcon/SectionDeleteIcon";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import {
  useDeletePackageMutation,
  useGetAllPackagesQuery,
} from "@/redux/api/packagesApi";

const AllPackages = () => {
  const [searchValue, setSearchValue] = useState({
    search: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetAllPackagesQuery({});
  const [deletePackage] = useDeletePackageMutation();

  const handleSearchChange = (e) => {
    setSearchValue({ ...searchValue, search: e.target.value });
  };

  // Filters companies based on the search query
  const filteredData = data?.data?.data;

  const handleDeletePackage = async (packages) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the Package  "${packages?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deletePackage(packages?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The Package "${packages?.name}" has been successfully deleted.`,
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
    <div className="md:px-6 px-4 py-5  rounded-lg">
      <div className="flex items-center justify-between space-x-4">
        <div className="px-2 md:px-5">
          <SectionTitle
            big_title={"All Package "}
            link_one={"/"}
            link_tow={"/packages/add-package"}
            title_one={"Home"}
            title_two={"Make Package "}
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
              className="bg-[#14151A] border border-[#26272F] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>
          {/* Link to create a new Package  */}
          <Link href="/packages/add-package">
            <button className="btn w-64">Add Package </button>
          </Link>
        </div>
      </div>
      <div className="mx-auto w-full pt-4">
        <div className="overflow-x-auto w-full">
          <h1 className="table_header">All Package</h1>
          <div className="table_section">
            <table className="w-full">
              <thead>
                <tr className="table_row">
                  <th className="table_th">ID</th>
                  <th className="table_th">Package Name</th>
                  <th className="table_th">package_type</th>
                  <th className="table_th">point</th>
                  <th className="table_th">family_group</th>
                  <th className="table_th">circle_group</th>
                  <th className="table_th">family_group_member</th>
                  <th className="table_th">circle_group_member</th>
                  <th className="table_th">wywtm_member</th>

                  <th className="table_th text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={item.id} className="tbody_tr">
                      <td className="table_th">{index + 1}</td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.name, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.package_type, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{item?.point}</p>
                      </td>
                      <td className="table_th">
                        <p>{item?.family_group} </p>
                      </td>
                      <td className="table_th">
                        <p>{item?.family_group_member} </p>
                      </td>
                      <td className="table_th">
                        <p>{item?.family_group_member} </p>
                      </td>
                      <td className="table_th">
                        <p>{item?.circle_group_member} </p>
                      </td>
                      <td className="table_th">
                        <p>{item?.wywtm_member} </p>
                      </td>

                      <td className="my-2 px-4 text-center ">
                        <div className="flex items-center justify-center w-full gap-4">
                          <SectionEditIcon
                            edit_link={`/packages/edit-package/${item?.id}`}
                          />
                          <SectionDeleteIcon
                            handleDelete={handleDeletePackage}
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
                      colSpan="7"
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
      </div>
    </div>
  );
};

export default AllPackages;
