import { Theme, toast, TypeOptions } from "react-toastify";

interface AlertToastProps {
  str: string; // 알림 문자
  // 알림 유형 (예: 'info', 'success', 'warning', 'error', 'default')
  type: TypeOptions;
  // 알림 테마 (예: 'light', 'dark', 'colored')
  theme: Theme;
}
export const AlertToast = ({ str, type, theme }: AlertToastProps) => {
  return toast(str, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
    closeButton: true,
    type: type,
    theme: theme,
    bodyStyle: {
      width: "500px"
    }
  });
};
