import { Contract, ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { headProfileAbi } from "../abi/HeadProfile";
import env from "ts-react-dotenv";
export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const headProfileABI = new Interface(headProfileAbi);
export const headProfileContract = new Contract(
  env.APP_CONTRACT_HEADPROFILE_ADDRESS,
  headProfileABI,
  provider.getSigner()
);
