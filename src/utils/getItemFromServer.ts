import { apiEndpoint } from "../constants/apiConstant";

const getItemFromServer = async (count: number) => {
  try {
    const res = await fetch(`${apiEndpoint}/api/v1/products?count=${count}`);
    const itemListData = await res.json();

    return itemListData;
  } catch (error) {
    console.error("response error", error);
  }
};

export default getItemFromServer;
