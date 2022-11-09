import axios, { AxiosRequestConfig } from "axios";

export const getNonce = async () => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: "POST",
      url: "/siwe/init",
    };

    const { data } = await axios(axiosConfig);

    return data.nonce;
  } catch (error) {
    console.log(error);
    return null;
  }
};
