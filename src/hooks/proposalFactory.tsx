import { useReadContract } from "wagmi";

import { proposalFactoryAddress } from "../abi/contracts";
import { proposalFactoryABI } from "../abi/proposalFactory/abi";

export const useAllProposals = () =>
  useReadContract({
    address: proposalFactoryAddress,
    abi: proposalFactoryABI,
    functionName: "getAllProposals",
  });
