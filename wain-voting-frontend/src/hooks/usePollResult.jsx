import { useCallback, useState } from "react";
import { getBlockchainConnection } from "../utils/wallet";
import { zeroPadValue } from "ethers";

export const usePollResult = (poll, walletAddress) => {
  const [pollResult, setPollResult] = useState(null);

  const fetchPollResult = useCallback(async () => {
    if (!poll?.chainId) return;
    try {
      const { contract } = await getBlockchainConnection(walletAddress);
      const bytesPollId = zeroPadValue(poll.chainId, 32);
      const result = await contract.getPollResult(bytesPollId);

      const [winnerId, highestVoteCount, totalVotes, candidateIds, voteCounts] =
        result;

      // Map ứng viên từ blockchain vào poll.candidates
      const mappedCandidates = poll.candidates.map((candidate) => {
        const bcIndex = candidateIds.findIndex(
          (cId) => cId.toString() === candidate.chainId.toString()
        );

        return {
          ...candidate, // giữ nguyên dữ liệu từ poll (name, desc, image,…)
          voteCount: bcIndex !== -1 ? Number(voteCounts[bcIndex]) : 0,
        };
      });

      setPollResult({
        winnerId,
        highestVoteCount: Number(highestVoteCount),
        totalVotes: Number(totalVotes),
        candidates: mappedCandidates,
      });
    } catch (err) {
      console.error("Lỗi khi lấy kết quả bình chọn:", err);
    }
  }, [poll?.chainId, walletAddress]);

  return { pollResult, fetchPollResult };
};
