import { AiOutlineStock } from "react-icons/ai";
import {
  MdAccountBalanceWallet,
  MdFormatListNumbered,
  MdManageHistory,
  MdOutlineDonutSmall,
  MdSettings,
  MdOutlineEmojiTransportation,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CgShutterstock } from "react-icons/cg";
import { FaProductHunt, FaSellcast } from "react-icons/fa";
import { CiBasketball } from "react-icons/ci";
import {
  FaCommentSms,
  FaGear,
  FaGears,
  FaServicestack,
  FaUsers,
} from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandAirbnb } from "react-icons/tb";
import { MdOutlinePermMedia } from "react-icons/md";
import { FaDelicious } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { LiaBlogSolid } from "react-icons/lia";
import { CiCompass1 } from "react-icons/ci";
import { MdWebAssetOff } from "react-icons/md";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {
  GiCarWheel,
  GiCash,
  GiChatBubble,
  GiVerticalBanner,
} from "react-icons/gi";
import { FaFeather } from "react-icons/fa";
import { SiJetpackcompose } from "react-icons/si";
import { FcSalesPerformance } from "react-icons/fc";
import { PiStudentBold } from "react-icons/pi";
import { IoPersonAddSharp, IoSettingsSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { MdCoPresent } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineTransaction } from "react-icons/ai";
import { LuLayoutTemplate } from "react-icons/lu";

export const privateRouteNames = [
  "Services",
  "Category",
  "Delivery",
  "Customer",
  "Users",
  "Company rules",
  "Company names",
  "Banners",
];

export const SidebarItemsData = [
  {
    id: 1,
    name: "Attendances",
    path: "/attendances/all-attendances",
    module_id: 1,
    Icon: <PiStudentBold size={20} />,
  },

  {
    id: 2,
    name: "Email",
    module_id: 1,
    path: "",
    Icon: <FaCommentSms size={20} />,
    sub: [
      {
        id: 1,
        name: "Email Gateways",
        path: "/email/email-gateways",
        module_id: 1,
        Icon: <MdFormatListNumbered size={20} />,
      },
      {
        id: 2,
        name: "Email Purchase",
        path: "/email/email-purchase",
        module_id: 1,
        Icon: <FaSellcast size={20} />,
      },
      {
        id: 3,
        name: "Email Credits",
        path: "/email/email-credits",
        module_id: 1,
        Icon: <MdFormatListNumbered size={20} />,
      },
      {
        id: 4,
        name: "Email Templates",
        path: "/email/email-templates",
        module_id: 1,
        Icon: <LuLayoutTemplate size={20} />,
      },
      {
        id: 5,
        name: "Email Settings",
        path: "/email/email-settings",
        module_id: 1,
        Icon: <IoSettingsSharp size={20} />,
      },
    ],
  },
  {
    id: 3,
    name: "Groups",
    module_id: 1,
    path: "/groups/all-groups",
    Icon: <BsFillFileEarmarkRuledFill size={20} />,
  },
  {
    id: 4,
    name: "Group Types",
    module_id: 1,
    path: "/group-types/all-group-types",
    Icon: <MdOutlineDonutSmall size={20} />,
  },
  {
    id: 5,
    name: "Members",
    module_id: 1,
    path: "/members/all-members",
    Icon: <AiOutlineTransaction size={20} />,
  },
  {
    id: 6,
    name: "Packages",
    module_id: 1,
    path: "/packages/all-packages",
    Icon: <MdCoPresent size={20} />,
  },
  {
    id: 7,
    name: "Points",
    module_id: 1,
    path: "/points/all-points",
    Icon: <FaHistory size={20} />,
  },
];
