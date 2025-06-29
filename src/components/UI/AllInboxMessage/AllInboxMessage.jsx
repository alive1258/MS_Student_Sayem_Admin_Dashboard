"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";

import { useDeleteEducationMutation } from "@/redux/api/educationApi";
import NotFound from "@/components/common/NotFound/NotFound";
import AccountPagination from "@/components/common/AccountPagination/AccountPagination";
import TableSkeleton from "@/components/common/Loading/TableSkeleton";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import { useGetAllSendMeaagesQuery } from "@/redux/api/SendMessageApi";

const AllInboxMessage = () => {
  const [searchValue, setSearchValue] = useState({
    search: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading, refetch } =
    useGetAllSendMeaagesQuery(searchValue);

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
            big_title={"All InboxMessage"}
            link_one={"/"}
            title_one={"Home"}
            link_two={"/home-page/eduction/all-eductions"}
            title_two={"All InboxMessage"}
            title_three={"Add InboxMessage"}
            link_three={"/home-page/eduction/add-eduction"}
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
        </div>
      </div>
      <div className="mx-auto w-full pt-4">
        <div className="overflow-x-auto w-full">
          <h1 className="table_header">All InboxMessage</h1>
          <div className="table_section">
            <table className="w-full">
              <thead>
                <tr className="table_row">
                  <th className="table_th w-4">#SL</th>
                  <th className="table_th "> Name</th>
                  <th className="table_th">Email</th>
                  <th className="table_th">Description</th>

                  {/* <th className="table_th text-center">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr key={item?.id} className="tbody_tr">
                      <td className="table_th">{index + 1}</td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.name, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{truncateCharacters(item?.email, 30)}</p>
                      </td>
                      <td className="table_th">
                        <p>{item?.description}</p>
                      </td>

                      {/* <td className="my-2 px-4 text-center ">
                        <div className="flex items-center justify-center w-full gap-4">
                          <EditIcon
                            edit_link={`/home-page/education/edit-education/${item?.id}`}
                          />
                          <DeleteIcon
                            handleDelete={handleDeleteEducation}
                            item={item}
                          />
                        </div>
                      </td> */}
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

export default AllInboxMessage;
