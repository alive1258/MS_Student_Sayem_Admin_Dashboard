import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const SectionTitle = ({
  title_one,
  link_one,
  title_two,
  link_tow,
  big_title,
}) => {
  // className="className="flex justify-between ""
  return (
    <div className="h-[85px] pt-2.5 ">
      <div>
        <h1 className="mt-0 text-xl font-bold text-info-muted">
          {" "}
          {big_title}{" "}
        </h1>

        <div className="flex items-center justify-start text-xs font-medium">
          <Link
            href={link_one ? link_one : "/"}
            className="py-1 text-[16px] font-medium leading-[18px] text-info-muted hover:underline hover:text-blue-500"
          >
            {title_one}
          </Link>
          {link_tow && <FiChevronRight className="text-[16px]" />}
          <Link
            href={link_tow ? link_tow : "/"}
            className="py-1 text-[14px]  text-blue-500 hover:underline font-medium leading-[18px]"
          >
            {title_two}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
