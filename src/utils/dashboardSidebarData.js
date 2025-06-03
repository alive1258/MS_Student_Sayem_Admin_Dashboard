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
    name: "Home Page",
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
    id: 2,
    name: "About Page",
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
    name: "Research & Publication",
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
    id: 4,
    name: "Project Page",
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
    id: 5,
    name: "Experience Page",
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
    id: 6,
    name: "ECA Page",
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
    id: 7,
    name: "Article Page",
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
    id: 8,
    name: "Testimonials",
    module_id: 1,
    path: "/testimonials/all-testimonials",
    Icon: <FaFeather size={20} />,
  },
  {
    id: 9,
    name: "Faqs",
    module_id: 1,
    path: "/faqs/all-faqs",
    Icon: <GiReturnArrow size={20} />,
  },
  {
    id: 10,
    name: "Faq Answers",
    module_id: 1,
    path: "/faq-answers/all-faq-answers",
    Icon: <GiVerticalBanner size={20} />,
  },
];
