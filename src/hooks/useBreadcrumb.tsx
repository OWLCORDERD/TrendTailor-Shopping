"use client";

import { useMemo, useState } from "react";

const menuList = [
  {
    id: 1,
    menuUrl: "/notice",
    menuName: "공지사항",
    menuIcon: "FaClipboardList",
    children: [],
  },
  {
    id: 2,
    menuUrl: "/shop",
    menuName: "상품 정보",
    menuIcon: "FaStore",
    children: [],
  },
];

interface BreadcrumbItem {
  name: string;
  path: string;
  icon?: string;
}

const useBreadcurmbSetting = (currentPath: string) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);

  useMemo(() => {
    if (currentPath && currentPath !== "") {
      menuList.forEach((menu) => {
        console.log("Current Path:", currentPath, "Menu URL:", menu.menuUrl);
        if (currentPath.includes(menu.menuUrl)) {
          console.log("Matched Menu:", menu);
          const breadcrumbItems = [
            { name: "Home", path: "/" },
            { name: menu.menuName, path: menu.menuUrl, icon: menu.menuIcon },
          ];

          setBreadcrumb(breadcrumbItems);
        }
      });
    } else {
      return {
        error: "Current path is undefined or empty",
      };
    }
  }, [currentPath]);

  console.log("Current Breadcrumb:", breadcrumb);

  return {
    breadcrumb,
  };
};

export default useBreadcurmbSetting;
