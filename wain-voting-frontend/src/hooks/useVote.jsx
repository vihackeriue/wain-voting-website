import { getBlockchainSign } from "../utils/wallet";
import useAuth from "./useAuth";

export const useVote = (
  chainIdPoll,
  isValidUserVoting,
  fetchRemainingVotes
) => {
  const { auth } = useAuth();

  const vote = async (chainIdCandidate) => {
    try {
      const { contract } = await getBlockchainSign(auth.walletAddress);

      if (!isValidUserVoting) {
        alert("Bạn đã hết lượt bình chọn!");
        return;
      }

      const tx = await contract.vote(chainIdPoll, chainIdCandidate, 1);
      await tx.wait();

      alert(`Bình chọn cho ứng viên ${chainIdCandidate} thành công!`);

      // Nếu cha có truyền hàm update số vote còn lại → gọi
      if (fetchRemainingVotes) {
        await fetchRemainingVotes();
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi bình chọn!");
    }
  };

  return { vote };
};
