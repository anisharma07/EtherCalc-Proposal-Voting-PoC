import { sepolia } from "viem/chains";
import { useReadContract } from "wagmi";
import { proposalABI } from "../contracts";
export const useMiniProposalInfo = ({
  proposalAddress,
}: {
  proposalAddress: `0x${string}`;
}) => {
  const {
    data: proposalInfo,
    isLoading,
    error,
  } = useReadContract({
    chainId: sepolia.id,
    abi: proposalABI,
    address: proposalAddress,
    functionName: "proposalInfo",
  });
  return { proposalInfo, isLoading, error };
};

export const useMiniOwnerInfo = ({
  proposalAddress,
}: {
  proposalAddress: `0x${string}`;
}) => {
  const { data: owner, isLoading: loadingOwner } = useReadContract({
    chainId: sepolia.id,
    abi: proposalABI,
    address: proposalAddress,
    functionName: "owner",
  });
  return { owner, loadingOwner };
};

export const useMiniYesVotes = ({
  proposalAddress,
}: {
  proposalAddress: `0x${string}`;
}) => {
  const { data: yesVotes, isLoading: loadingVote } = useReadContract({
    chainId: sepolia.id,
    abi: proposalABI,
    address: proposalAddress,
    functionName: "yesVotes",
  });
  return { yesVotes, loadingVote };
};

export const useMiniNoVotes = ({
  proposalAddress,
}: {
  proposalAddress: `0x${string}`;
}) => {
  const { data: noVotes, isLoading: loadingNoVote } = useReadContract({
    chainId: sepolia.id,
    abi: proposalABI,
    address: proposalAddress,
    functionName: "noVotes",
  });
  return { noVotes, loadingNoVote };
};

export const useFreeze = ({
  proposalAddress,
}: {
  proposalAddress: `0x${string}`;
}) => {
  const { data: freeze, isLoading: loadingfreeze } = useReadContract({
    chainId: sepolia.id,
    abi: proposalABI,
    address: proposalAddress,
    functionName: "frozen",
  });
  return { freeze, loadingfreeze };
};
