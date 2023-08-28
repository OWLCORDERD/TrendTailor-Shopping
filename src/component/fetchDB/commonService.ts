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
  getNews: () => {
    return service({
      url: "api/News",
    }).then((res) => res.data);
  },
};

export default getDB;
