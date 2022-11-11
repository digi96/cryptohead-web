import { Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import { headProfileAbi } from "../abi/HeadProfile"

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ABI = new Interface(headProfileAbi);

export const headProfileContract = new Contract(contractAddress, ABI);
