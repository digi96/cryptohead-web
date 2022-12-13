import { Contract, ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { headProfileAbi } from "../abi/HeadProfile";
import { headTemplateAbi } from "../abi/HeadTemplate";
import env from "ts-react-dotenv";

export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const headProfileABI = new Interface(headProfileAbi);
export const headProfileContract = new Contract(
  env.APP_CONTRACT_HEADPROFILE_ADDRESS,
  headProfileABI,
  provider.getSigner()
);

export const headTemplateABI = new Interface(headTemplateAbi);
export const headTemplateContract = new Contract(
  env.APP_CONTRACT_HEADTEMPLATE_ADDRESS,
  headTemplateABI,
  provider.getSigner()
);
