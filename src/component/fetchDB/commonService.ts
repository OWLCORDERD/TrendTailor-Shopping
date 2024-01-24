import service from "./index";

const getDB = {
  getSeason: () => {
    return service({
      url: "/season",
    }).then((res) => res.data);
  },
  getClothes: () => {
    return service({
      url: "/clothes",
    }).then((res) => res.data);
  },
  getNotice: () => {
    return service({
      url: "/notice",
    }).then((res) => res.data);
  },
  getMainSlider: () => {
    return service({
      url: "/wishMainSlider",
    }).then((res) => res.data);
  },
};

export default getDB;
