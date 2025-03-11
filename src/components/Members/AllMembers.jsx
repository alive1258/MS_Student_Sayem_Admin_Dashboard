"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import TableSkeleton from "../common/Loading/TableSkeleton";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import SectionDeleteIcon from "../common/SectionDeleteIcon/SectionDeleteIcon";
import SectionEditIcon from "../common/SectionEditIcon/SectionEditIcon";
import SectionTitle from "../common/PosSectionTitle/PosSectionTitle";
import {
  useDeleteMemberMutation,
  useGetAllMembersQuery,
} from "@/redux/api/membersApi";

const AllMembers = () => {
  const [searchValue, setSearchValue] = useState({
    search: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetAllMembersQuery({});

  // Delete member
  const [deleteMember] = useDeleteMemberMutation();

  const handleSearchChange = (e) => {
    setSearchValue({ ...searchValue, search: e.target.value });
  };

  // Filters companies based on the search query
  const filteredData = data?.data?.data;

  const handleDeleteMember = async (member) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the member "${member?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deleteMember(member?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The member"${member?.name}" has been successfully deleted.`,
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
            big_title={"All Member"}
            link_one={"/"}
            link_tow={"/members/add-member"}
            title_one={"Home"}
            title_two={"Make Member"}
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
          {/* Link to create a new GMember */}
          <Link href="/members/add-member">
            <button className="btn w-64">Add Member</button>
          </Link>
        </div>
      </div>
      <div className="mx-auto w-full pt-4">
        <div className="overflow-x-auto w-full">
          <h1 className="table_header">All Member</h1>
          <div className="table_section">
            <table className="w-full">
              <thead>
                <tr className="table_row">
                  <th className="table_th">ID</th>
                  <th className="table_th">User Name</th>
                  <th className="table_th">Group Name</th>
                  <th className="table_th">Status</th>
                  <th className="table_th text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={item.id} className="tbody_tr">
                      <td className="table_th">{index + 1}</td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.user?.name, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.group?.name, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.status, 30)}</p>
                      </td>

                      <td className="my-2 px-4 text-center ">
                        <div className="flex items-center justify-center w-full gap-4">
                          <SectionEditIcon
                            edit_link={`/members/edit-member/${item?.id}`}
                          />
                          <SectionDeleteIcon
                            handleDelete={handleDeleteMember}
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

export default AllMembers;
