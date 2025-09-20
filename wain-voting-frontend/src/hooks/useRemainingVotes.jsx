import { useCallback, useState } from "react";
import { getBlockchainConnection } from "../utils/wallet";
import { zeroPadValue } from "ethers";

export const useRemainingVotes = (poll, walletAddress) => {
  const [remainingVotes, setRemainingVotes] = useState(0);

  const fetchRemainingVotes = useCallback(async () => {
    if (!poll?.chainId) return;
    try {
      const { contract, userAddress } = await getBlockchainConnection(
        walletAddress
      );
      const bytesPollId = zeroPadValue(poll.chainId, 32);
      const votes = await contract.getRemainingVotes(bytesPollId, userAddress);
      setRemainingVotes(Number(votes));
    } catch (err) {
      console.error("Error fetching remaining votes:", err);
    }
  }, [poll?.chainId, walletAddress]);

  return { remainingVotes, fetchRemainingVotes };
};
