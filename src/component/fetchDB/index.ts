import axios from "axios";
import commonService from "./commonService";

const getService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_API,
  timeout: 60000,
});

export default getService;
export { commonService };
