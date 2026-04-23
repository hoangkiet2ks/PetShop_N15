import { get } from "../utils/request";

export const getProductList = async () => {
  const result = await get("product"); 
  return result;
};