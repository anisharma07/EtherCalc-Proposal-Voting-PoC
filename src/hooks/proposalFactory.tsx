import { useReadContract } from "wagmi";
import { proposalFactoryABI, proposalFactoryAddress } from "../contracts";
// const { writeContractAsync } = useWriteContract();

// Read: getAllProposals
export const useAllProposals = () =>
  useReadContract({
    address: proposalFactoryAddress,
    abi: proposalFactoryABI,
    functionName: "getAllProposals",
  });

// Read: getMyBalance
export const useMyBalance = () =>
  useReadContract({
    address: proposalFactoryAddress,
    abi: proposalFactoryABI,
    functionName: "getMyBalance",
  });

// Write: createProposal (async function)
// export const createProposalAsync = async (
//   metaURI: string,
//   startDate: bigint | number,
//   config: any // pass { account, chainId, walletClient } as needed
// ) => {
//   return await writeContractAsync({
//     address: proposalFactoryAddress,
//     abi: proposalFactoryABI,
//     functionName: "createProposal",
//     args: [metaURI, startDate],
//     ...config,
//   });
// };
