import { useReadContract } from "wagmi";
import { sepolia } from "viem/chains";
import { mediTokenABI } from "../abi/medtokens/abi";
import { mediTokenAddress } from "../abi/contracts";

export const useMyBalance = ({
  userAddress,
}: {
  userAddress?: `0x${string}`;
}) => {
  const { data: balance, isLoading } = useReadContract({
    chainId: sepolia.id,
    abi: mediTokenABI,
    address: mediTokenAddress,
    functionName: "getUserTokens",
    args: userAddress
      ? [userAddress]
      : ["0x14BDDD50de520FD7e70820119D5e6F95EC56910A"], // safe fallback
  });

  return { balance, isLoading };
};
