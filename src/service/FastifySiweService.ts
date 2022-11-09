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

export const verifySignedMessage = async (signedMessage: string) => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: "GET",
      url: "/siwe/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${signedMessage}`,
      },
    };

    const { data } = await axios(axiosConfig);

    console.log(JSON.stringify(data, null, 4));

    return data.loggedIn;
  } catch (error) {
    console.log(error);
    return false;
  }
};
