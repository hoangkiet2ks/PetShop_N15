import { get } from "../utils/request";

export const getCountryList = async () => {
  const result = await get("country"); 
  return result;
};
