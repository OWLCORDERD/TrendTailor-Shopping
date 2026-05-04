import { IoHomeSharp } from "react-icons/io5"; // 메인 (홈) 아이콘
import { FaClipboardList } from "react-icons/fa"; // 공지사항 아이콘
import { FaStore } from "react-icons/fa"; // 상품 아이콘
import { FaUser } from "react-icons/fa"; // 로그인 아이콘
import { FaUserPlus } from "react-icons/fa"; // 회원가입 아이콘
import { IconType } from "react-icons/lib"; // react-icons 아이콘 컴포넌트 타입

interface BreadcrumbItem {
  name: string;
  path: string;
  icon?: IconType;
}

interface menuType {
  id: number;
  menuUrl: string;
  menuName: string;
  menuIcon?: IconType;
  menuDepth: number;
  isNavigate: boolean;
  children: menuType[];
}

const useBreadcurmbSetting = (currentPath: string) => {
  // TrendTailor 메뉴 뎁스 목록
  const menuList: menuType[] = [
    {
      id: 1,
      menuUrl: "/notice",
      menuName: "공지사항",
      menuIcon: FaClipboardList,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 2,
      menuUrl: "/shop",
      menuName: "쇼핑몰",
      menuIcon: FaStore,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 3,
      menuUrl: "/login",
      menuName: "로그인",
      menuIcon: FaUser,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 4,
      menuUrl: "/signup",
      menuName: "회원가입",
      menuIcon: FaUserPlus,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
  ];

  const currentBreadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", path: "/", icon: IoHomeSharp },
  ];

  if (currentPath && currentPath !== "") {
    menuList.forEach((menu) => {
      if (currentPath.includes(menu.menuUrl)) {
        currentBreadcrumbItems.push({
          name: menu.menuName,
          path: menu.menuUrl,
          icon: menu.menuIcon ?? undefined,
        });
      }

      // 1뎁스 자식 2뎁스 존재할 시, 메뉴 추가
      if (menu.children.length > 0) {
        menu.children.forEach((child) => {
          if (currentPath.includes(child.menuUrl)) {
            currentBreadcrumbItems.push({
              name: child.menuName,
              path: child.menuUrl,
            });
          }
        });
      }
    });
  }

  return currentBreadcrumbItems;
};

export default useBreadcurmbSetting;
