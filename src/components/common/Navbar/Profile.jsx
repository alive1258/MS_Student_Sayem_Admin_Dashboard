"use client";
import Image from "next/image";
// import profile from "../../../app/assets/images/profile.png";
import { IoIosArrowDown } from "react-icons/io";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignOutMutation } from "@/redux/api/authApi";

const Profile = () => {
  const router = useRouter();
  const [signOut] = useSignOutMutation();
  const [activeModal, setActiveModal] = useState(false);
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Confirm Sign Out",
        text: "Are you sure you want to sign out of your account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sign Out",
      });

      if (result.isConfirmed) {
        const response = await signOut().unwrap();
        if (response?.success) {
          router.push("/sign-in");
          Swal.fire({
            title: "Signed Out",
            text: "You have successfully signed out of your account.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Sign Out Failed",
            text:
              response?.message ||
              "Unable to process your sign out request. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Unexpected Error",
        text: `Something went wrong. Please try again later. Error details: ${
          error.data || error.message
        }`,
        icon: "error",
      });
    }
  };

  return (
    <div className="relative w-full min-w-[180px]">
      <div
        onClick={() => setActiveModal(!activeModal)}
        className="w-full min-w-[180px]  relative   group flex items-center gap-2 justify-between"
      >
        <div className="flex items-center gap-2">
          {/* <Image
            src={profile}
            className="rounded-full"
            width={40}
            height={40}
            alt="profile"
          /> */}
          <div>
            <h6 className="text-[15px] font-semibold text-primary-muted">
              Nayem Uddin
            </h6>
            <span className="text-[13px] text-primary-muted">Admin</span>
          </div>
        </div>
        <IoIosArrowDown className="text-[19px] text-white/70" />
      </div>
      <ul
        className={`absolute right-0 top-[65px] w-full bg-primary-base rounded-md p-2 shadow-lg transition-transform duration-300 ${
          activeModal
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <li className="text-[14px] text-white p-2 cursor-pointer hover:bg-black-muted">
          Profile
        </li>
        <li className="text-[14px] text-white p-2 cursor-pointer hover:bg-black-muted">
          Settings
        </li>
        <li className="text-[14px] text-white p-2 w-full cursor-pointer hover:bg-black-muted">
          Switch Branch
        </li>
        <li
          onClick={handleLogout}
          className="text-[14px] text-white p-2 cursor-pointer hover:bg-black-muted"
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Profile;
