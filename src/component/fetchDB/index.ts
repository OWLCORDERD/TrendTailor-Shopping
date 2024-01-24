import axios from "axios";
import commonService from "./commonService";

const getService = axios.create({
  baseURL: "https://iuprofile.site",
  timeout: 60000,
});

export default getService;
export { commonService };
