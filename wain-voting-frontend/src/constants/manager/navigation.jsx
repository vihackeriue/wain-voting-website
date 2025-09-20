import {
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineQuestionMarkCircle,
  HiOutlineViewGrid,
} from "react-icons/hi";

export const MANAGER_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Trang chủ",
    path: "/manager",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "pollList",
    label: "Cuộc bình chọn",
    path: "/manager/poll-list",
    icon: <HiOutlineCube />,
  },
  {
    key: "category",
    label: "Danh mục",
    path: "/manager/category-list",
    icon: <HiOutlineCube />,
  },
  {
    key: "userList",
    label: "Quản lý người dùng",
    path: "/manager/user-list",
    icon: <HiOutlineCube />,
  },
];

export const MANAGER_SIDEBAR_FOOTER_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/manager/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Support",
    path: "/manager/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
