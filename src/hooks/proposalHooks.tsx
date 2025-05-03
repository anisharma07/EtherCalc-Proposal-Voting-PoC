import { useReadContract } from "wagmi";
import { proposalABI } from "../contracts";

// const { writeContractAsync } = useWriteContract();

// Read: getFullProposalDetails
export const useFullProposalDetails = (proposalAddress: `0x${string}`) =>
  useReadContract({
    address: proposalAddress,
    abi: proposalABI,
    functionName: "getFullProposalDetails",
  });

// Read: getPartialProposalDetails
export const usePartialProposalDetails = (proposalAddress: `0x${string}`) =>
  useReadContract({
    address: proposalAddress,
    abi: proposalABI,
    functionName: "getPartialProposalDetails",
  });

// Read: getVoteStatus
export const useVoteStatus = (proposalAddress: `0x${string}`) =>
  useReadContract({
    address: proposalAddress,
    abi: proposalABI,
    functionName: "getVoteStatus",
  });

// Write: freezeAndStartVote (async function)
// export const freezeAndStartVoteAsync = async (
//   proposalAddress: `0x${string}`,
//   finalIPFS: string,
//   endDate: bigint | number,
//   config: any // pass { account, chainId, walletClient } as needed
// ) => {
//   return await writeContractAsync({
//     address: proposalAddress,
//     abi: proposalABI,
//     functionName: "freezeAndStartVote",
//     args: [finalIPFS, endDate],
//     ...config,
//   });
// };

// Write: makeVote (async function)
// export const makeVoteAsync = async (
//   proposalAddress: `0x${string}`,
//   voterHash: string,
//   voteValue: number,
//   config: any // pass { account, chainId, walletClient } as needed
// ) => {
//   return await writeContractAsync({
//     address: proposalAddress,
//     abi: proposalABI,
//     functionName: "makeVote",
//     args: [voterHash, voteValue],
//     ...config,
//   });
// };
