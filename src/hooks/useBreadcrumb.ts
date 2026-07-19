import { IoHomeSharp } from "react-icons/io5"; // 메인 (홈) 아이콘
import { FaClipboardList } from "react-icons/fa"; // 공지사항 아이콘
import { FaStore } from "react-icons/fa"; // 상품 아이콘
import { FaUser } from "react-icons/fa"; // 로그인 아이콘
import { FaUserPlus } from "react-icons/fa"; // 회원가입 아이콘
import { IconType } from "react-icons/lib"; // react-icons 아이콘 컴포넌트 타입
import { PiTreeStructureLight } from "react-icons/pi";

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
      menuUrl: "/",
      menuName: "홈",
      menuIcon: IoHomeSharp,
      menuDepth: 0,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 2,
      menuUrl: "/notice",
      menuName: "공지사항",
      menuIcon: FaClipboardList,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 3,
      menuUrl: "/shop",
      menuName: "쇼핑",
      menuIcon: FaStore,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 4,
      menuUrl: "/login",
      menuName: "로그인",
      menuIcon: FaUser,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 5,
      menuUrl: "/signup",
      menuName: "회원가입",
      menuIcon: FaUserPlus,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
    {
      id: 6,
      menuUrl: "/trend-keyword",
      menuName: "트랜드 키워드",
      menuIcon: PiTreeStructureLight,
      menuDepth: 1,
      isNavigate: true, // 네비게이션 활성화 여부
      children: [],
    },
  ];

  // 루트 경로(home) 시작점부터 현재 경로에 따른 브래드크럼 배열 생성
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

  return {
    breadcrumb: currentBreadcrumbItems, // 루트 경로(home) > 현재 경로 브래드크럼 배열 반환
    menuList: menuList, // 플랫폼 전체 메뉴 목록 반환
  };
};

export default useBreadcurmbSetting;
