import service from "./index";

const getDB = {
  getSeason: () => {
    return service({
      url: "api/season",
    }).then((res) => res.data);
  },
  getClothes: () => {
    return service({
      url: "api/clothes",
    }).then((res) => res.data);
  },
  getNotice: () => {
    return service({
      url: "api/viewNotice",
    }).then((res) => res.data);
  },
};

export default getDB;
